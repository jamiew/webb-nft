// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import "forge-std/Test.sol";
import "../src/WebbNFT.sol";
import "../src/WebbMultimint.sol";

contract WebbMultimintTest is Test {
    WebbNFT private nft;
    WebbMultimint private multimint;

    address private owner =
        vm.addr(uint256(keccak256(abi.encodePacked("owner"))));
    address private minter =
        vm.addr(uint256(keccak256(abi.encodePacked("minter"))));

    function setUp() public {
        nft = new WebbNFT("ipfs://hydra", 3);
        console.log("nft", address(nft));
        multimint = new WebbMultimint(address(nft));
        console.log("multimint", address(multimint));
    }

    function testMintAll() public {
        uint256 maxID = nft.maxID();
        for (uint256 i = 1; i <= maxID; i++) {
            console.log("should have 0 of", i);
            assertEq(nft.balanceOf(minter, i), 0);
        }

        // execute multiple times for more accurate gas reports
        uint256 runs = 5;
        for (uint256 i = 0; i < runs; i++) {
            vm.prank(minter);
            multimint.mintAll();
        }

        for (uint256 i = 1; i <= maxID; i++) {
            assertEq(nft.balanceOf(minter, i), runs);
        }
    }
}
