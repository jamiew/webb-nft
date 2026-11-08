// @vitest-environment jsdom
import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  ConnectButton,
  EthereumProviders,
  useWallet,
} from "./EthereumProviders";
import {
  discoverWallets,
  type BrowserWallet,
  type BrowserWalletProvider,
} from "./wallet";

const account = "0x1111111111111111111111111111111111111111";
const otherAccount = "0x2222222222222222222222222222222222222222";
let container: HTMLDivElement;
let root: Root;

function makeWallet() {
  const listeners = new Map<string, Set<(value: unknown) => void>>();
  const request = vi.fn(
    async ({
      method,
    }: {
      method: string;
      params?: readonly unknown[];
    }): Promise<unknown> => {
      if (method === "eth_requestAccounts") return [account];
      if (method === "eth_chainId") return "0x1";
      throw new Error(`Unexpected request: ${method}`);
    },
  );
  const provider: BrowserWalletProvider = {
    request,
    on(event, listener) {
      const subscribers = listeners.get(event) ?? new Set();
      subscribers.add(listener);
      listeners.set(event, subscribers);
    },
    removeListener(event, listener) {
      listeners.get(event)?.delete(listener);
    },
  };
  return {
    provider,
    request,
    emit(event: string, value: unknown) {
      for (const listener of listeners.get(event) ?? []) listener(value);
    },
  };
}

function State() {
  const { connection } = useWallet();
  return (
    <output>
      {connection
        ? `${connection.account}:${connection.chainId}`
        : "disconnected"}
    </output>
  );
}

async function click(text: string) {
  const button = [...container.querySelectorAll("button")].find(
    (button) => button.textContent === text,
  );
  if (!button) throw new Error(`Button not found: ${text}`);
  await act(async () => button.click());
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("ethereum", undefined);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("browser wallet discovery", () => {
  it("discovers EIP-6963 wallets, ignores icons and deduplicates the injected fallback", () => {
    const { provider } = makeWallet();
    vi.stubGlobal("ethereum", provider);
    const wallets: BrowserWallet[] = [];
    const announce = () =>
      window.dispatchEvent(
        new CustomEvent("eip6963:announceProvider", {
          detail: {
            info: {
              uuid: "wallet-1",
              name: "Test Wallet",
              icon: "https://untrusted.example/icon.svg",
            },
            provider,
          },
        }),
      );
    window.addEventListener("eip6963:requestProvider", announce);
    const stop = discoverWallets(window, (wallet) => wallets.push(wallet));
    announce();
    expect(wallets).toEqual([
      { id: "wallet-1", name: "Test Wallet", provider },
    ]);
    stop();
    window.removeEventListener("eip6963:requestProvider", announce);
    const second = makeWallet();
    window.dispatchEvent(
      new CustomEvent("eip6963:announceProvider", {
        detail: {
          info: { uuid: "wallet-2", name: "Late Wallet" },
          provider: second.provider,
        },
      }),
    );
    expect(wallets).toHaveLength(1);
  });

  it("supports late injected wallets and ignores malformed announcements", () => {
    const wallets: BrowserWallet[] = [];
    const stop = discoverWallets(window, (wallet) => wallets.push(wallet));
    window.dispatchEvent(
      new CustomEvent("eip6963:announceProvider", {
        detail: { info: { name: "Invalid" } },
      }),
    );
    const { provider } = makeWallet();
    vi.stubGlobal("ethereum", provider);
    window.dispatchEvent(new Event("ethereum#initialized"));
    expect(wallets).toEqual([
      { id: "injected", name: "Browser wallet", provider },
    ]);
    stop();
  });
});

describe("wallet connection state", () => {
  it("tracks accounts and chains, and keeps a local disconnect disconnected", async () => {
    const wallet = makeWallet();
    vi.stubGlobal("ethereum", wallet.provider);
    await act(async () =>
      root.render(
        <StrictMode>
          <EthereumProviders>
            <ConnectButton />
            <State />
          </EthereumProviders>
        </StrictMode>,
      ),
    );
    expect(wallet.request).not.toHaveBeenCalled();
    await click("Connect Wallet");
    expect(container.querySelectorAll("li")).toHaveLength(1);
    await click("Browser wallet");
    expect(container.querySelector("output")?.textContent).toBe(`${account}:1`);
    await act(async () => wallet.emit("accountsChanged", [otherAccount]));
    await act(async () => wallet.emit("chainChanged", "0x5"));
    expect(container.querySelector("output")?.textContent).toBe(
      `${otherAccount}:5`,
    );
    await click("Disconnect locally");
    await act(async () => wallet.emit("accountsChanged", [account]));
    expect(container.querySelector("output")?.textContent).toBe("disconnected");
  });

  it.each(["accountsChanged", "disconnect"])(
    "clears a connection on %s",
    async (event) => {
      const wallet = makeWallet();
      vi.stubGlobal("ethereum", wallet.provider);
      await act(async () =>
        root.render(
          <EthereumProviders>
            <ConnectButton />
            <State />
          </EthereumProviders>,
        ),
      );
      await click("Connect Wallet");
      await click("Browser wallet");
      await act(async () => wallet.emit(event, []));
      expect(container.querySelector("output")?.textContent).toBe(
        "disconnected",
      );
    },
  );

  it("reports a rejected connection without connecting", async () => {
    const wallet = makeWallet();
    wallet.request.mockRejectedValue({ code: 4001, message: "Rejected" });
    vi.stubGlobal("ethereum", wallet.provider);
    await act(async () =>
      root.render(
        <EthereumProviders>
          <ConnectButton />
          <State />
        </EthereumProviders>,
      ),
    );
    await click("Connect Wallet");
    await click("Browser wallet");
    expect(container.querySelector("[role=alert]")?.textContent).toContain(
      "Request rejected",
    );
    expect(container.querySelector("output")?.textContent).toBe("disconnected");
  });

  it("ignores an approved request after the connection chooser was closed", async () => {
    const wallet = makeWallet();
    const approval = Promise.withResolvers<unknown>();
    wallet.request.mockImplementation(() => approval.promise);
    vi.stubGlobal("ethereum", wallet.provider);
    await act(async () =>
      root.render(
        <EthereumProviders>
          <ConnectButton />
          <State />
        </EthereumProviders>,
      ),
    );
    await click("Connect Wallet");
    await click("Browser wallet");
    await click("Close");
    await act(async () => approval.resolve([account]));
    expect(container.querySelector("output")?.textContent).toBe("disconnected");
    expect(wallet.request).toHaveBeenCalledTimes(1);
  });

  it("does not overwrite an account event with a stale request response", async () => {
    const wallet = makeWallet();
    wallet.request.mockImplementation(async ({ method }) => {
      if (method === "eth_requestAccounts") {
        wallet.emit("accountsChanged", [otherAccount]);
        return [account];
      }
      return "0x1";
    });
    vi.stubGlobal("ethereum", wallet.provider);
    await act(async () =>
      root.render(
        <EthereumProviders>
          <ConnectButton />
          <State />
        </EthereumProviders>,
      ),
    );
    await click("Connect Wallet");
    await click("Browser wallet");
    expect(container.querySelector("output")?.textContent).toBe(
      `${otherAccount}:1`,
    );
  });
});
