import Image from "next/image";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

import { Button } from "./Button";
import { webbNFTContract } from "./contracts";
import { extractContractError } from "./extractContractError";
import { pluralize } from "./pluralize";
import { promiseNotify } from "./promiseNotify";
import { switchChain } from "./switchChain";
import { usePromiseFn } from "./usePromiseFn";

type Props = {
  id: number;
  title: string;
  description: string;
  detail: string;
  image: string;
  width: number;
  height: number;
};

export const MintButton = ({
  id,
  title,
  description,
  detail,
  image,
  width,
  height,
}: Props) => {
  const { connector } = useAccount();

  const [mintResult, mint] = usePromiseFn(
    async (quantity: number, onProgress: (message: string) => void) => {
      if (!connector) {
        throw new Error("Wallet not connected");
      }

      onProgress("Preparing wallet…");
      await switchChain(connector);
      const signer = await connector.getSigner();
      const contract = webbNFTContract.connect(signer);

      try {
        onProgress(`Minting ${pluralize(quantity, "token", "tokens")}…`);

        const tx = await promiseNotify(contract.mint(quantity)).after(
          1000 * 5,
          () => onProgress("Please confirm transaction in your wallet…")
        );
        console.log("mint tx", tx);

        // onProgress("Finalizing transaction…");
        // const receipt = await promiseNotify(tx.wait())
        //   .after(1000 * 15, () =>
        //     onProgress(
        //       "It can sometimes take a while to finalize a transaction…"
        //     )
        //   )
        //   .after(1000 * 30, () => onProgress("Still working on it…"));
        // console.log("mint receipt", receipt);

        // return { receipt };
        return {};
      } catch (error) {
        console.error("Transaction error:", error);
        const contractError = extractContractError(error);
        throw new Error(`Transaction error: ${contractError}`);
      }
    },
    [connector]
  );

  return (
    <div className="w-full mt-4">
      <h2 className="title text-2xl font-bold">
        {title} (#{id})
      </h2>
      {description && (
        <p className="description text-sm">
          {description}{" "}
          {detail && (
            <a href={detail} target="_blank" rel="noreferrer">
              More&hellip;
            </a>
          )}
        </p>
      )}

      <div className="relative pt-2">
        <Image src={image} width={width} height={height} alt={title} />

        <Button
          className="absolute top-5 right-4"
          pending={mintResult.type === "pending"}
          onClick={(event) => {
            event.preventDefault();
            const toastId = toast.loading("Starting…");
            mint(1, (message) => {
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
          Mint
        </Button>
      </div>
    </div>
  );
};
