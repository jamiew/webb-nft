import { isAddress, type Address } from "viem";

export type BrowserWalletProvider = {
  request: (request: {
    method: string;
    params?: readonly unknown[];
  }) => Promise<unknown>;
  on: (event: string, listener: (value: unknown) => void) => void;
  removeListener: (event: string, listener: (value: unknown) => void) => void;
};

export type BrowserWallet = {
  id: string;
  name: string;
  provider: BrowserWalletProvider;
};

function isProvider(value: unknown): value is BrowserWalletProvider {
  return (
    typeof value === "object" &&
    value !== null &&
    "request" in value &&
    typeof value.request === "function" &&
    "on" in value &&
    typeof value.on === "function" &&
    "removeListener" in value &&
    typeof value.removeListener === "function"
  );
}

export function discoverWallets(
  target: Window,
  onWallet: (wallet: BrowserWallet) => void,
) {
  const providers = new Set<BrowserWalletProvider>();
  const ids = new Set<string>();
  function add(wallet: BrowserWallet) {
    if (providers.has(wallet.provider) || ids.has(wallet.id)) return;
    providers.add(wallet.provider);
    ids.add(wallet.id);
    onWallet(wallet);
  }
  function announce(event: Event) {
    if (!(event instanceof CustomEvent)) return;
    const detail: unknown = event.detail;
    if (
      typeof detail !== "object" ||
      detail === null ||
      !("info" in detail) ||
      !("provider" in detail) ||
      !isProvider(detail.provider)
    )
      return;
    const info = detail.info;
    if (
      typeof info !== "object" ||
      info === null ||
      !("uuid" in info) ||
      typeof info.uuid !== "string" ||
      !("name" in info) ||
      typeof info.name !== "string"
    )
      return;
    add({ id: info.uuid, name: info.name, provider: detail.provider });
  }
  function fallback() {
    if ("ethereum" in target && isProvider(target.ethereum)) {
      add({
        id: "injected",
        name: "Browser wallet",
        provider: target.ethereum,
      });
    }
  }
  target.addEventListener("eip6963:announceProvider", announce);
  target.addEventListener("ethereum#initialized", fallback);
  target.dispatchEvent(new Event("eip6963:requestProvider"));
  fallback();
  return () => {
    target.removeEventListener("eip6963:announceProvider", announce);
    target.removeEventListener("ethereum#initialized", fallback);
  };
}

export function firstAccount(value: unknown): Address | undefined {
  if (!Array.isArray(value)) return undefined;
  const account: unknown = value[0];
  return typeof account === "string" && isAddress(account)
    ? account
    : undefined;
}

export function parseChainId(value: unknown): number | undefined {
  if (typeof value !== "string" || !/^0x[0-9a-f]+$/i.test(value))
    return undefined;
  const chainId = Number(value);
  return Number.isSafeInteger(chainId) && chainId > 0 ? chainId : undefined;
}

export function walletErrorMessage(error: unknown): string {
  let cause = error;
  const seen = new Set<unknown>();
  while (typeof cause === "object" && cause !== null && !seen.has(cause)) {
    seen.add(cause);
    if ("code" in cause && cause.code === 4001) {
      return "Request rejected in your wallet. No mint was confirmed.";
    }
    cause = "cause" in cause ? cause.cause : undefined;
  }
  return error instanceof Error
    ? error.message
    : "The wallet request failed. No mint was confirmed.";
}
