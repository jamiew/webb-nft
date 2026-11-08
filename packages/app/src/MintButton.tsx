import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "./Button";
import { mintNFT } from "./contracts";
import { useWallet } from "./EthereumProviders";
import { walletErrorMessage } from "./wallet";

type Props = { tokenId?: number; text: string; classNames?: string };

export function MintButton({ tokenId, text, classNames }: Props) {
  const { connection, isConnected, requestConnect } = useWallet();
  const [pending, setPending] = useState(false);
  const inFlight = useRef(false);

  async function mint() {
    if (inFlight.current) return;
    if (!connection) {
      requestConnect();
      return;
    }
    inFlight.current = true;
    setPending(true);
    const toastId = toast.loading("Preparing your wallet…");
    try {
      await mintNFT({
        provider: connection.wallet.provider,
        account: connection.account,
        tokenId,
        isConnected: () => isConnected(connection),
        onProgress: (message) => toast.update(toastId, { render: message }),
      });
      toast.update(toastId, {
        isLoading: false,
        type: "success",
        render: "Mint confirmed!",
        autoClose: 5000,
        closeButton: true,
      });
    } catch (error) {
      toast.update(toastId, {
        isLoading: false,
        type: "error",
        render: walletErrorMessage(error),
        autoClose: 8000,
        closeButton: true,
      });
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  return (
    <Button
      className={classNames}
      pending={pending}
      onClick={() => void mint()}
    >
      {text}
    </Button>
  );
}
