import { Contract } from "ethers";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

import { Button } from "./Button";
import { extractContractError } from "./extractContractError";
import { promiseNotify } from "./promiseNotify";
import { switchChain } from "./switchChain";
import { usePromiseFn } from "./usePromiseFn";

type Props = {
  contract: Contract;
  functionName: string;
  args: Array<unknown>;
  text: string;
  classNames: string | undefined;
};

export const MintButton = ({
  contract,
  functionName,
  args,
  text,
  classNames,
}: Props) => {
  const { connector } = useAccount();

  const [mintResult, mint] = usePromiseFn(
    async (onProgress: (message: string) => void) => {
      if (!connector) {
        throw new Error("Wallet not connected");
      }

      onProgress(`Preparing wallet…`);
      await switchChain(connector);
      const signer = await connector.getSigner();
      const contractWithSigner = contract.connect(signer);

      try {
        onProgress(`Calling ${functionName}(${args}) on ${contract.address}`);

        const tx = await promiseNotify(
          contractWithSigner.functions[functionName](args)
        ).after(1000 * 5, () =>
          onProgress("Please confirm transaction in your wallet…")
        );
        console.log("mint tx", tx);

        onProgress("Finalizing transaction…");
        const receipt = await promiseNotify(tx.wait())
          .after(1000 * 15, () =>
            onProgress(
              "It can sometimes take a while to finalize a transaction…"
            )
          )
          .after(1000 * 30, () => onProgress("Still working on it…"));
        console.log("mint receipt", receipt);

        return { receipt };
      } catch (error) {
        console.error("Transaction error:", error);
        const contractError = extractContractError(error);
        throw new Error(`Transaction error: ${contractError}`);
      }
    },
    [connector]
  );

  return (
    <Button
      className={classNames}
      pending={mintResult.type === "pending"}
      onClick={(event) => {
        event.preventDefault();
        const toastId = toast.loading("Starting…");
        mint((message) => {
          toast.update(toastId, { render: message });
        }).then(
          () => {
            // TODO: show etherscan link?
            toast.update(toastId, {
              isLoading: false,
              type: "success",
              render: `Minted!`,
              autoClose: 5000,
              closeButton: true,
            });
          },
          (error) => {
            toast.update(toastId, {
              isLoading: false,
              type: "error",
              render: String(error.message),
              autoClose: 5000,
              closeButton: true,
            });
          }
        );
      }}
    >
      {text || "Mint"}
    </Button>
  );
};
