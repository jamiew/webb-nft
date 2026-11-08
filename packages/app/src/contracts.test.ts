import { beforeEach, describe, expect, it, vi } from "vitest";
import { decodeFunctionData, parseAbi, type Address } from "viem";
import type * as Actions from "viem/actions";

import {
  mintNFT,
  mintTransaction,
  multimintContractAddress,
  nftContractAddress,
} from "./contracts";
import { walletErrorMessage, type BrowserWalletProvider } from "./wallet";

const { waitForTransactionReceipt } = vi.hoisted(() => ({
  waitForTransactionReceipt: vi.fn(),
}));
vi.mock("viem/actions", async (importOriginal) => {
  const actual = await importOriginal<typeof Actions>();
  return { ...actual, waitForTransactionReceipt };
});

const account: Address = "0x1111111111111111111111111111111111111111";
const hash = `0x${"a".repeat(64)}`;

function wallet() {
  const request = vi.fn(
    async ({
      method,
    }: {
      method: string;
      params?: readonly unknown[];
    }): Promise<unknown> => {
      if (method === "eth_chainId") return "0x1";
      if (method === "eth_accounts") return [account];
      if (method === "eth_sendTransaction") return hash;
      throw new Error(`Unexpected wallet request: ${method}`);
    },
  );
  const provider: BrowserWalletProvider = {
    request,
    on: vi.fn(),
    removeListener: vi.fn(),
  };
  return { provider, request };
}

beforeEach(() => {
  waitForTransactionReceipt.mockReset();
  waitForTransactionReceipt.mockResolvedValue({ status: "success" });
});

describe("mint calldata", () => {
  it("uses the unchanged NFT address and one scalar uint256", () => {
    const transaction = mintTransaction(6);
    expect(transaction.to).toBe("0xf639b4ebb77df1ed4b5014c244f60e72b8adb29b");
    expect(transaction.value).toBe(0n);
    expect(
      decodeFunctionData({
        abi: parseAbi(["function mint(uint256 id)"]),
        data: transaction.data,
      }),
    ).toEqual({ functionName: "mint", args: [6n] });
  });

  it("uses the unchanged multimint address with no encoded arguments", () => {
    const transaction = mintTransaction();
    expect(transaction.to).toBe("0x3Ed96FC9Aeb5e987E0ef8f6B126213d33A0f1358");
    expect(transaction.data).toHaveLength(10);
    expect(transaction.value).toBe(0n);
    expect(
      decodeFunctionData({
        abi: parseAbi(["function mintAll()"]),
        data: transaction.data,
      }).functionName,
    ).toBe("mintAll");
  });
});

describe("mint safety", () => {
  it("submits the selected mint from the connected account and waits for its receipt", async () => {
    const { provider, request } = wallet();
    await mintNFT({
      provider,
      account,
      tokenId: 2,
      isConnected: () => true,
      onProgress: vi.fn(),
    });
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "eth_sendTransaction",
        params: [
          expect.objectContaining({
            from: account,
            chainId: "0x1",
            to: nftContractAddress,
            data: mintTransaction(2).data,
            value: "0x0",
          }),
        ],
      }),
    );
    expect(waitForTransactionReceipt).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ hash }),
    );
  });

  it("waits for confirmation before resolving", async () => {
    const { provider } = wallet();
    const confirmation = Promise.withResolvers<{ status: string }>();
    const submitted = Promise.withResolvers<void>();
    waitForTransactionReceipt.mockImplementation(() => {
      submitted.resolve();
      return confirmation.promise;
    });
    let completed = false;
    const mint = mintNFT({
      provider,
      account,
      isConnected: () => true,
      onProgress: vi.fn(),
    }).then(() => {
      completed = true;
    });
    await submitted.promise;
    expect(completed).toBe(false);
    confirmation.resolve({ status: "success" });
    await mint;
    expect(completed).toBe(true);
  });

  it("switches to mainnet before submitting zero-argument Mint All", async () => {
    const { provider, request } = wallet();
    let chainId = "0x5";
    request.mockImplementation(async ({ method }) => {
      if (method === "eth_chainId") return chainId;
      if (method === "wallet_switchEthereumChain") {
        chainId = "0x1";
        return null;
      }
      if (method === "eth_accounts") return [account];
      if (method === "eth_sendTransaction") return hash;
      throw new Error(`Unexpected request: ${method}`);
    });
    await mintNFT({
      provider,
      account,
      isConnected: () => true,
      onProgress: vi.fn(),
    });
    expect(request).toHaveBeenCalledWith({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "eth_sendTransaction",
        params: [
          expect.objectContaining({
            to: multimintContractAddress,
            data: mintTransaction().data,
          }),
        ],
      }),
    );
  });

  it("does not send if a successful switch response leaves the wrong chain active", async () => {
    const { provider, request } = wallet();
    request.mockImplementation(async ({ method }) =>
      method === "eth_chainId" ? "0x5" : null,
    );
    await expect(
      mintNFT({
        provider,
        account,
        isConnected: () => true,
        onProgress: vi.fn(),
      }),
    ).rejects.toThrow("mainnet");
    expect(request).toHaveBeenCalledWith({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
    expect(
      request.mock.calls.some(
        ([request]) => request.method === "eth_sendTransaction",
      ),
    ).toBe(false);
    expect(waitForTransactionReceipt).not.toHaveBeenCalled();
  });

  it("does not send if the chain changes again before submission", async () => {
    const { provider, request } = wallet();
    let chainReads = 0;
    request.mockImplementation(async ({ method }) => {
      if (method === "eth_chainId") return ++chainReads === 1 ? "0x1" : "0x5";
      if (method === "eth_accounts") return [account];
      throw new Error(`Unexpected request: ${method}`);
    });
    await expect(
      mintNFT({
        provider,
        account,
        isConnected: () => true,
        onProgress: vi.fn(),
      }),
    ).rejects.toThrow();
    expect(
      request.mock.calls.some(
        ([request]) => request.method === "eth_sendTransaction",
      ),
    ).toBe(false);
  });

  it("does not send after a chain event contradicts a stale mainnet RPC response", async () => {
    const { provider, request } = wallet();
    let chainListener: ((value: unknown) => void) | undefined;
    provider.on = (event, listener) => {
      if (event === "chainChanged") chainListener = listener;
    };
    let chainReads = 0;
    request.mockImplementation(async ({ method }) => {
      if (method === "eth_chainId") {
        if (++chainReads === 2) chainListener?.("0x5");
        return "0x1";
      }
      if (method === "eth_accounts") return [account];
      if (method === "eth_sendTransaction") return hash;
      throw new Error(`Unexpected request: ${method}`);
    });
    await expect(
      mintNFT({
        provider,
        account,
        isConnected: () => true,
        onProgress: vi.fn(),
      }),
    ).rejects.toThrow("mainnet");
    expect(
      request.mock.calls.some(
        ([request]) => request.method === "eth_sendTransaction",
      ),
    ).toBe(false);
  });

  it("does not send after disconnecting during the final chain check", async () => {
    const { provider, request } = wallet();
    let chainReads = 0;
    let connected = true;
    request.mockImplementation(async ({ method }) => {
      if (method === "eth_chainId") {
        if (++chainReads === 2) connected = false;
        return "0x1";
      }
      if (method === "eth_accounts") return [account];
      throw new Error(`Unexpected request: ${method}`);
    });
    await expect(
      mintNFT({
        provider,
        account,
        isConnected: () => connected,
        onProgress: vi.fn(),
      }),
    ).rejects.toThrow("changed or disconnected");
    expect(
      request.mock.calls.some(
        ([request]) => request.method === "eth_sendTransaction",
      ),
    ).toBe(false);
  });

  it.each(["account", "disconnect"])(
    "does not send after an %s change",
    async (change) => {
      const { provider, request } = wallet();
      if (change === "account") {
        request.mockImplementation(async ({ method }) =>
          method === "eth_chainId" ? "0x1" : [],
        );
      }
      await expect(
        mintNFT({
          provider,
          account,
          isConnected: () => change !== "disconnect",
          onProgress: vi.fn(),
        }),
      ).rejects.toThrow("changed or disconnected");
      expect(
        request.mock.calls.some(
          ([request]) => request.method === "eth_sendTransaction",
        ),
      ).toBe(false);
    },
  );

  it.each(["wallet_switchEthereumChain", "eth_sendTransaction"])(
    "reports rejection of %s without success",
    async (rejectedMethod) => {
      const { provider, request } = wallet();
      request.mockImplementation(async ({ method }) => {
        if (method === rejectedMethod)
          throw { code: 4001, message: "User rejected" };
        if (method === "eth_chainId")
          return rejectedMethod === "wallet_switchEthereumChain"
            ? "0x5"
            : "0x1";
        if (method === "eth_accounts") return [account];
        throw new Error(`Unexpected request: ${method}`);
      });
      const failure = await mintNFT({
        provider,
        account,
        isConnected: () => true,
        onProgress: vi.fn(),
      }).catch((error: unknown) => error);
      expect(walletErrorMessage(failure)).toContain("Request rejected");
      expect(waitForTransactionReceipt).not.toHaveBeenCalled();
    },
  );

  it("does not report success for a reverted receipt", async () => {
    const { provider } = wallet();
    waitForTransactionReceipt.mockResolvedValue({ status: "reverted" });
    await expect(
      mintNFT({
        provider,
        account,
        isConnected: () => true,
        onProgress: vi.fn(),
      }),
    ).rejects.toThrow("reverted");
  });

  it("does not report success for a cancelled or unrelated replacement", async () => {
    const { provider } = wallet();
    waitForTransactionReceipt.mockImplementation(
      async (_client, { onReplaced }) => {
        onReplaced({ reason: "cancelled" });
        return { status: "success" };
      },
    );
    await expect(
      mintNFT({
        provider,
        account,
        isConnected: () => true,
        onProgress: vi.fn(),
      }),
    ).rejects.toThrow("cancelled or replaced");
  });

  it("propagates receipt failures rather than claiming a confirmed mint", async () => {
    const { provider } = wallet();
    waitForTransactionReceipt.mockRejectedValue(
      new Error("Receipt unavailable"),
    );
    await expect(
      mintNFT({
        provider,
        account,
        isConnected: () => true,
        onProgress: vi.fn(),
      }),
    ).rejects.toThrow("Receipt unavailable");
  });
});
