import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

import { About } from "../About";
import { useWebbNFTContractRead } from "../contracts";
import { MintButton } from "../MintButton";
import { useIsMounted } from "../useIsMounted";

const HomePage: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <div className="min-h-screen flex flex-col md:p-6 p-2 max-w-[85rem]">
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
          className="flex-col flex-shrink md:pt-20 pt-12 max-w-[50rem] md:max-w-sm mx-auto md:mx-0 px-8 md:px-0"
        >
          <About />
        </div>

        <div className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[10vh] max-w-[50rem] mx-auto">
          {/* Use isMounted to temporarily workaround hydration issues where
          server-rendered markup doesn't match the client due to localStorage
          caching in wagmi. See https://github.com/holic/web3-scaffold/pull/26 */}

          <MintButton
            id={1}
            title={`Galaxy cluster SMACS 0723`}
            detail={
              "https://www.nasa.gov/sites/default/files/thumbnails/image/main_image_deep_field_smacs0723-5mb.jpg"
            }
            description={`As it appeared 4.6 billion years ago. "Webb's First Deep Field"`}
            image={"/thumbnails/1.jpg"}
            width={1600}
            height={1632}
          />
          <MintButton
            id={2}
            title="Carina Nebula"
            description={`A young, star-forming region in the nebula called NGC 3324.`}
            detail={"https://www.nasa.gov/webbfirstimages"}
            image={"/thumbnails/2.jpg"}
            width={1600}
            height={926}
          />
          <MintButton
            id={3}
            title="Southern Ring Nebula (NIRCam)"
            description={
              "NGC 3132, a star cloaked in dust, 2500 light years away."
            }
            detail={
              "https://webbtelescope.org/contents/news-releases/2022/news-2022-033"
            }
            image={"/thumbnails/3.jpg"}
            width={1600}
            height={1388}
          />
          <MintButton
            id={4}
            title="Southern Ring Nebula (MIRI)"
            description={
              "NGC 3132, a star cloaked in dust, 2500 light years away."
            }
            detail={
              "https://webbtelescope.org/contents/news-releases/2022/news-2022-033"
            }
            image={"/thumbnails/4.jpg"}
            width={1600}
            height={1490}
          />
          <MintButton
            id={5}
            title="Stephan's Quintet (NIRCam)"
            description={"Five galaxies caught in a cosmic dance."}
            detail={
              "https://www.nasa.gov/image-feature/goddard/2022/nasa-s-webb-sheds-light-on-galaxy-evolution-black-holes"
            }
            image={"/thumbnails/5.jpg"}
            width={1600}
            height={1534}
          />
          <MintButton
            id={6}
            title="Stephan's Quintet (MIRI)"
            description={"Five galaxies caught in a cosmic dance."}
            detail={
              "https://www.nasa.gov/image-feature/goddard/2022/nasa-s-webb-sheds-light-on-galaxy-evolution-black-holes"
            }
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
