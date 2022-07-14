// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {WebbMultimint} from "../src/WebbMultimint.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        new WebbMultimint(0xF639B4EbB77DF1ed4b5014C244F60E72B8AdB29b);
        vm.stopBroadcast();
    }
}
