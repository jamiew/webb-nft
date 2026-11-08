import {
  createClient,
  custom,
  encodeFunctionData,
  http,
  parseAbi,
  type Address,
} from "viem";
import { mainnet } from "viem/chains";
import { sendTransaction, waitForTransactionReceipt } from "viem/actions";

import { switchChain } from "./switchChain";
import {
  firstAccount,
  parseChainId,
  type BrowserWalletProvider,
} from "./wallet";

// Existing mainnet deployments. Signatures match packages/contracts/src/*.sol.
export const nftContractAddress: Address =
  "0xf639b4ebb77df1ed4b5014c244f60e72b8adb29b";
export const multimintContractAddress: Address =
  "0x3Ed96FC9Aeb5e987E0ef8f6B126213d33A0f1358";
const nftAbi = parseAbi(["function mint(uint256 id)"]);
const multimintAbi = parseAbi(["function mintAll()"]);

export function mintTransaction(tokenId?: number) {
  if (tokenId === undefined) {
    return {
      to: multimintContractAddress,
      data: encodeFunctionData({ abi: multimintAbi, functionName: "mintAll" }),
      value: 0n,
    };
  }
  return {
    to: nftContractAddress,
    data: encodeFunctionData({
      abi: nftAbi,
      functionName: "mint",
      args: [BigInt(tokenId)],
    }),
    value: 0n,
  };
}

// Receipt polling stays on mainnet even if the wallet changes networks afterwards.
const publicClient = createClient({
  chain: mainnet,
  transport: http("https://ethereum.reth.rs/rpc"),
});

type MintOptions = {
  provider: BrowserWalletProvider;
  account: Address;
  tokenId?: number;
  isConnected: () => boolean;
  onProgress: (message: string) => void;
};

export async function mintNFT({
  provider,
  account,
  tokenId,
  isConnected,
  onProgress,
}: MintOptions) {
  let observedChain: number | undefined;
  const chainChanged = (value: unknown) => {
    observedChain = parseChainId(value) ?? 0;
  };
  provider.on("chainChanged", chainChanged);
  try {
    onProgress("Checking Ethereum mainnet in your wallet…");
    await switchChain(provider);
    const currentAccount = firstAccount(
      await provider.request({ method: "eth_accounts" }),
    );
    if (
      !isConnected() ||
      currentAccount?.toLowerCase() !== account.toLowerCase()
    ) {
      throw new Error(
        "Your wallet account changed or disconnected. Connect again before minting.",
      );
    }
    const walletClient = createClient({
      account,
      chain: mainnet,
      transport: custom(
        {
          request(request: Parameters<BrowserWalletProvider["request"]>[0]) {
            if (!isConnected()) {
              throw new Error(
                "Your wallet account changed or disconnected. Connect again before minting.",
              );
            }
            if (request.method === "eth_sendTransaction") {
              if (observedChain !== undefined && observedChain !== 1) {
                throw new Error(
                  "Your wallet left Ethereum mainnet. Switch back before minting.",
                );
              }
              const transaction = request.params?.[0];
              if (typeof transaction !== "object" || transaction === null) {
                throw new Error(
                  "The wallet transaction could not be prepared.",
                );
              }
              // Bind the wallet approval to mainnet, not just the earlier RPC check.
              return provider.request({
                method: request.method,
                params: [{ ...transaction, chainId: "0x1" }],
              });
            }
            return provider.request(request);
          },
        },
        { retryCount: 0 },
      ),
    });
    onProgress("Confirm the mint transaction in your wallet…");
    const hash = await sendTransaction(walletClient, {
      ...mintTransaction(tokenId),
      chain: mainnet,
    });
    onProgress(
      "Transaction submitted. Waiting for confirmation on Ethereum mainnet…",
    );
    let cancelled = false;
    const receipt = await waitForTransactionReceipt(publicClient, {
      hash,
      onReplaced: ({ reason }) => {
        if (reason !== "repriced") cancelled = true;
      },
    });
    if (cancelled)
      throw new Error(
        "The mint transaction was cancelled or replaced. No mint was confirmed.",
      );
    if (receipt.status !== "success")
      throw new Error("The mint transaction reverted. No NFT was minted.");
    return receipt;
  } finally {
    provider.removeListener("chainChanged", chainChanged);
  }
}
