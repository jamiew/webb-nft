// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Preview from the repository root:
// forge script packages/contracts/script/WebbNFT.s.sol:DeployScript --rpc-url "$ETH_RPC_URL"
// Review the chain, signer and simulation before adding --broadcast.

import "forge-std/Script.sol";
import {WebbNFT} from "../src/WebbNFT.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        new WebbNFT(
            "ipfs://QmWdKUq3qHjstVSqCs9fMMoVB37N7pATprPXdWaCcfeQSs/",
            6
        );

        vm.stopBroadcast();
    }
}
