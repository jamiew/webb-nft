// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Preview from the repository root with a mainnet RPC:
// forge script packages/contracts/script/WebbMultimint.s.sol:DeployScript --rpc-url "$ETH_RPC_URL"
// Review the chain, signer and simulation before adding --broadcast.

import "forge-std/Script.sol";
import {WebbMultimint} from "../src/WebbMultimint.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();

        // mainnet
        new WebbMultimint(0xF639B4EbB77DF1ed4b5014C244F60E72B8AdB29b);

        vm.stopBroadcast();
    }
}
