import Image from "next/image";

import { webbNFTContract } from "./contracts";
import { MintButton } from "./MintButton";

type Props = {
  id: number;
  title: string;
  description: string;
  detail: string;
  image: string;
  width: number;
  height: number;
};

export const NFTEntry = ({
  id,
  title,
  description,
  detail,
  image,
  width,
  height,
}: Props) => {
  return (
    <div className="w-full mt-4">
      <h2 className="title text-2xl font-bold">
        {title} (#{id})
      </h2>
      {description && (
        <p className="description">
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
        <MintButton
          contract={webbNFTContract}
          functionName={"mint"}
          args={[id]}
          text={`Mint`}
          classNames={"absolute top-5 right-4"}
        />
      </div>
    </div>
  );
};
