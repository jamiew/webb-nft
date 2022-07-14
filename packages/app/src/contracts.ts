// import WebbMultimintInterface from "@web3-scaffold/contracts/out/WebbMultimint.sol/WebbMultimint.json";
import WebbNFTInterface from "@web3-scaffold/contracts/out/WebbNFT.sol/WebbNFT.json";
import {
  WebbMultimint__factory,
  WebbNFT__factory,
} from "@web3-scaffold/contracts/types";
import { useContractRead } from "wagmi";

import { provider, targetChainId } from "./EthereumProviders";

// I would have used `WebbNFT__factory.connect` to create this, but we may
// not have a provider ready to go. Any interactions with this contract should
// use `webbNFTContract.connect(providerOrSigner)` first.

// export const webbNFTContract = new Contract(
//   WebbNFTGoerli.deployedTo,
//   WebbNFT__factory.abi
// ) as WebbNFT;

// currently only mainnet & goerli deployments
const nftContractAddress =
  targetChainId == 1
    ? "0xf639b4ebb77df1ed4b5014c244f60e72b8adb29b"
    : "0x860148ae4c23e28d4fccbdb6f99c71cd8d859f18";

const multimintContractAddress =
  targetChainId == 1
    ? "0x3Ed96FC9Aeb5e987E0ef8f6B126213d33A0f1358"
    : "0xbe5C0c149aA303C22854927e9933c7728c9fcaEF";

export const webbNFTContract = WebbNFT__factory.connect(
  nftContractAddress,
  provider({ chainId: targetChainId })
);

export const useWebbNFTContractRead = (
  readConfig: Omit<
    Parameters<typeof useContractRead>[0],
    "addressOrName" | "contractInterface"
  >
) =>
  useContractRead({
    ...readConfig,
    addressOrName: nftContractAddress,
    contractInterface: WebbNFTInterface.abi,
  });

export const webbMultimintContract = WebbMultimint__factory.connect(
  multimintContractAddress,
  provider({ chainId: targetChainId })
);
