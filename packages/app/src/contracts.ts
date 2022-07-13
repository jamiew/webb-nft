import WebbNFTInterface from "@web3-scaffold/contracts/out/WebbNFT.sol/WebbNFT.json";
import { WebbNFT__factory } from "@web3-scaffold/contracts/types";
import { useContractRead } from "wagmi";

import { provider, targetChainId } from "./EthereumProviders";

// I would have used `WebbNFT__factory.connect` to create this, but we may
// not have a provider ready to go. Any interactions with this contract should
// use `webbNFTContract.connect(providerOrSigner)` first.

// export const webbNFTContract = new Contract(
//   WebbNFTGoerli.deployedTo,
//   WebbNFT__factory.abi
// ) as WebbNFT;

const contractAddress = "0x3ed96fc9aeb5e987e0ef8f6b126213d33a0f1358";

export const webbNFTContract = WebbNFT__factory.connect(
  contractAddress,
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
    addressOrName: contractAddress,
    contractInterface: WebbNFTInterface.abi,
  });
