// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/*
  to deploy:
    forge script script/WebbMultimint.s.sol:DeployScript --rpc-url $ETH_RPC_URL --private-key $PRIVATE_KEY --broadcast

  to verify:
  (TODO keep this contract address in sync between here and the code below)

    forge verify-contract --chain-id 5 --num-of-optimizations 2000 --constructor-args $(cast abi-encode "constructor(address)" "0xF639B4EbB77DF1ed4b5014C244F60E72B8AdB29b") $ADDRESS packages/contracts/src/WebbMultimint.sol:WebbMultimint
*/

import "forge-std/Script.sol";
import {WebbMultimint} from "../src/WebbMultimint.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        // mainnet
        new WebbMultimint(0xF639B4EbB77DF1ed4b5014C244F60E72B8AdB29b);

        // goerli
        // new WebbMultimint(0x3Ed96FC9Aeb5e987E0ef8f6B126213d33A0f1358);

        vm.stopBroadcast();
    }
}
