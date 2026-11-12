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
      <h2 className="text-2xl font-bold">
        {title} (#{id})
      </h2>
      {description && (
        <p>
          {description}{" "}
          {detail && (
            <a href={detail} target="_blank" rel="noreferrer">
              More&hellip;
            </a>
          )}
        </p>
      )}

      <div className="relative pt-2">
        <img
          src={image}
          width={width}
          height={height}
          alt={title}
          className="block w-full h-auto"
          loading={id === 1 ? "eager" : "lazy"}
          decoding="async"
        />
        <MintButton
          tokenId={id}
          text="Mint"
          classNames="absolute top-5 right-4"
        />
      </div>
    </div>
  );
};
