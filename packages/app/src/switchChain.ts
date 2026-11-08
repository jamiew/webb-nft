import type { BrowserWalletProvider } from "./wallet";
import { parseChainId } from "./wallet";

export async function switchChain(provider: BrowserWalletProvider) {
  if (parseChainId(await provider.request({ method: "eth_chainId" })) === 1)
    return;
  await provider.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x1" }],
  });
  if (parseChainId(await provider.request({ method: "eth_chainId" })) !== 1) {
    throw new Error("Switch your wallet to Ethereum mainnet before minting.");
  }
}
