import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { useWebbNFTContractRead } from "../contracts";
import { MintButton } from "../MintButton";
import { useIsMounted } from "../useIsMounted";

const HomePage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div
        id="container"
        className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[10vh]"
      >
        <h1 className="text-4xl"></h1>

        <div className="flex-grow flex flex-col text-left gap-4 text-lg mb-8">
          <p>
            Commemorative NFTs to celebrate the first images collected by the
            James Webb Space Telescope (JWST).{" "}
            <a
              href="https://www.nasa.gov/image-feature/goddard/2022/nasa-s-webb-delivers-deepest-infrared-image-of-universe-yet"
              target="_blank"
              rel="noreferrer"
            >
              Read more.
            </a>
          </p>
          <p>Free mint, 100% open-source, please enjoy!</p>

          <p>
            <a href="" target="_blank" rel="noreferrer">
              Smart contract
            </a>{" "}
            &ndash;{" "}
            <a href="" target="_blank" rel="noreferrer">
              Full source code
            </a>{" "}
          </p>
          <p>
            Brought to you by <a href="https://twitter.com/jamiew">jamiedubs</a>{" "}
            & <a href="https://defdao.xyz">DEF</a>
          </p>

          <p>Images &copy; 2022 NASA and available in the public domain</p>
        </div>

        {/* Use isMounted to temporarily workaround hydration issues where
        server-rendered markup doesn't match the client due to localStorage
        caching in wagmi. See https://github.com/holic/web3-scaffold/pull/26 */}

        <MintButton
          id={1}
          title="SMACS 0723"
          image={"/thumbnails/1.jpg"}
          width={1600}
          height={1632}
        />
        <MintButton
          id={2}
          title="Carina Nebula"
          image={"/thumbnails/2.jpg"}
          width={1600}
          height={926}
        />
        <MintButton
          id={3}
          title="Southern Ring Nebula (NIRCam)"
          image={"/thumbnails/3.jpg"}
          width={1600}
          height={1388}
        />
        <MintButton
          id={4}
          title="Southern Ring Nebula (MIRI)"
          image={"/thumbnails/4.jpg"}
          width={1600}
          height={1490}
        />
        <MintButton
          id={5}
          title="Stephan's Quintet (NIRCam)"
          image={"/thumbnails/5.jpg"}
          width={1600}
          height={1534}
        />
        <MintButton
          id={6}
          title="Stephan's Quintet (MIRI)"
          image={"/thumbnails/6.jpg"}
          width={1600}
          height={1340}
        />
      </div>
    </div>
  );
};

export default HomePage;
