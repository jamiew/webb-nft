import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { About } from "../About";
import { useWebbNFTContractRead } from "../contracts";
import { MintButton } from "../MintButton";
import { useIsMounted } from "../useIsMounted";

const HomePage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div className="min-h-screen flex flex-col md:p-6 p-2">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Bitter&display=optional"
      />

      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div className="md:flex md:flex-row-reverse">
        {/* <h1 className="text-4xl"></h1> */}
        <div
          id="about"
          className="flex-col flex-shrink max-w-sm md:pt-20 pt-12 md:pl-0 pl-10"
        >
          <About />
        </div>

        <div
          id="container"
          className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[10vh]"
        >
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
    </div>
  );
};

export default HomePage;
