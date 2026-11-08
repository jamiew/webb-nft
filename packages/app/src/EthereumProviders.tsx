import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Address } from "viem";

import { Button } from "./Button";
import {
  discoverWallets,
  firstAccount,
  parseChainId,
  walletErrorMessage,
  type BrowserWallet,
} from "./wallet";

type Connection = {
  wallet: BrowserWallet;
  account: Address;
  chainId?: number;
  session: number;
};
type WalletContextValue = {
  connection?: Connection;
  isConnected: (connection: Connection) => boolean;
  requestConnect: () => void;
};
const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function useWallet() {
  const wallet = useContext(WalletContext);
  if (!wallet)
    throw new Error("Wallet controls must be inside EthereumProviders.");
  return wallet;
}

export function EthereumProviders({ children }: { children: ReactNode }) {
  const [wallets, setWallets] = useState<BrowserWallet[]>([]);
  const [connection, setConnection] = useState<Connection>();
  const [choosing, setChoosing] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string>();
  const active = useRef<BrowserWallet | undefined>(undefined);
  const latest = useRef<Connection | undefined>(undefined);
  const unsubscribe = useRef<(() => void) | undefined>(undefined);
  const attempt = useRef(0);

  function disconnect() {
    attempt.current += 1;
    unsubscribe.current?.();
    unsubscribe.current = undefined;
    active.current = undefined;
    latest.current = undefined;
    setConnection(undefined);
    setConnecting(false);
    setError(undefined);
  }

  useEffect(() => {
    const stopDiscovery = discoverWallets(window, (wallet) => {
      setWallets((current) =>
        current.some(
          (item) => item.id === wallet.id || item.provider === wallet.provider,
        )
          ? current
          : [...current, wallet],
      );
    });
    return () => {
      stopDiscovery();
      attempt.current += 1;
      unsubscribe.current?.();
      unsubscribe.current = undefined;
    };
  }, []);

  async function connect(wallet: BrowserWallet) {
    disconnect();
    const currentAttempt = attempt.current;
    active.current = wallet;
    setConnecting(true);
    let account: Address | undefined;
    let chainId: number | undefined;
    let accountVersion = 0;
    let chainVersion = 0;
    const current = () =>
      attempt.current === currentAttempt && active.current === wallet;
    function update() {
      if (!current()) return;
      const next = account
        ? { wallet, account, chainId, session: currentAttempt }
        : undefined;
      latest.current = next;
      setConnection(next);
    }
    function accountsChanged(value: unknown) {
      if (!current()) return;
      accountVersion += 1;
      account = firstAccount(value);
      if (!account) {
        disconnect();
        return;
      }
      update();
    }
    function chainChanged(value: unknown) {
      if (!current()) return;
      chainVersion += 1;
      chainId = parseChainId(value);
      update();
    }
    function providerDisconnected() {
      if (current()) disconnect();
    }
    const provider = wallet.provider;
    provider.on("accountsChanged", accountsChanged);
    provider.on("chainChanged", chainChanged);
    provider.on("disconnect", providerDisconnected);
    unsubscribe.current = () => {
      provider.removeListener("accountsChanged", accountsChanged);
      provider.removeListener("chainChanged", chainChanged);
      provider.removeListener("disconnect", providerDisconnected);
    };
    try {
      const accountsAtRequest = accountVersion;
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      if (!current()) return;
      if (accountsAtRequest === accountVersion)
        account = firstAccount(accounts);
      if (!account)
        throw new Error(
          "Your wallet did not provide an account. Unlock it and try again.",
        );
      const chainAtRequest = chainVersion;
      const chain = await provider.request({ method: "eth_chainId" });
      if (!current()) return;
      if (chainAtRequest === chainVersion) chainId = parseChainId(chain);
      update();
      setChoosing(false);
    } catch (failure) {
      if (!current()) return;
      disconnect();
      setError(walletErrorMessage(failure));
    } finally {
      if (current()) setConnecting(false);
    }
  }

  return (
    <WalletContext.Provider
      value={{
        connection,
        isConnected: (expected) =>
          attempt.current === expected.session &&
          active.current === expected.wallet &&
          latest.current?.account.toLowerCase() ===
            expected.account.toLowerCase(),
        requestConnect: () => {
          setError(undefined);
          setChoosing(true);
        },
      }}
    >
      {children}
      {connection && (
        <div className="fixed bottom-4 right-4 z-10 rounded bg-black p-3 text-sm text-white">
          <span>
            {connection.wallet.name} · {connection.account.slice(0, 6)}…
            {connection.account.slice(-4)}
          </span>
          {connection.chainId !== 1 && (
            <p>Switch to Ethereum mainnet when minting.</p>
          )}
          <Button className="mt-2" onClick={disconnect}>
            Disconnect locally
          </Button>
        </div>
      )}
      {choosing && (
        <section
          aria-labelledby="wallet-heading"
          className="fixed bottom-4 left-4 right-4 z-20 rounded border border-gray-600 bg-black p-5 text-white sm:left-auto sm:max-w-sm"
        >
          <h2 id="wallet-heading" className="mb-3 text-lg">
            Choose a browser wallet
          </h2>
          {wallets.length === 0 && (
            <p>
              No browser wallet found. Install a wallet extension or open this
              site in your wallet’s browser.
            </p>
          )}
          <ul className="space-y-2">
            {wallets.map((wallet) => (
              <li key={wallet.id}>
                <Button
                  disabled={connecting}
                  onClick={() => void connect(wallet)}
                >
                  {wallet.name}
                </Button>
              </li>
            ))}
          </ul>
          {connecting && (
            <p role="status" className="mt-3">
              Approve the connection in your wallet.
            </p>
          )}
          {error && (
            <p role="alert" className="mt-3">
              {error}
            </p>
          )}
          <Button
            className="mt-4"
            onClick={() => {
              if (connecting) disconnect();
              setChoosing(false);
            }}
          >
            Close
          </Button>
        </section>
      )}
    </WalletContext.Provider>
  );
}

export function ConnectButton() {
  const { connection, requestConnect } = useWallet();
  return (
    <Button onClick={requestConnect}>
      {connection
        ? `${connection.account.slice(0, 6)}…${connection.account.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}
