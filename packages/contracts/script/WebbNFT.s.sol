// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/*
to deploy, expecting $GOERLI_RPC_URL and $PRIVATE_KEY:

  forge script script/WebbNFT.s.sol:DeployScript --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY --broadcast

(copy address to $ADDRESS)

to verify:

  forge verify-contract --chain-id 5 --num-of-optimizations 2000 --constructor-args $(cast abi-encode "constructor(string,uint256)" "ipfs://QmWdKUq3qHjstVSqCs9fMMoVB37N7pATprPXdWaCcfeQSs/" 6) $ADDRESS packages/contracts/src/WebbNFT.sol:WebbNFT

(copy guid to $GUID)

to confirm verification status:

  forge verify-check --chain-id 5 $GUID

to check the output of `uri()` for deployed contract:

  cast call --rpc-url $GOERLI_RPC_URL $ADDRESS "uri(uint256)(string)" 1

TODO would using a --constructor-args-file make this simpler?

*/

import "forge-std/Script.sol";
import {WebbNFT} from "../src/WebbNFT.sol";

// import {Solenv} from "solenv/Solenv.sol";

contract DeployScript is Script {
    function run() external {
        // Solenv.config(".env.local");
        // address deployer = vm.envAddress("DEPLOYER_ADDRESS");
        // address owner = vm.envAddress("OWNER_ADDRESS");

        vm.startBroadcast();

        new WebbNFT(
            "ipfs://QmWdKUq3qHjstVSqCs9fMMoVB37N7pATprPXdWaCcfeQSs/",
            6
        );

        vm.stopBroadcast();
    }
}
