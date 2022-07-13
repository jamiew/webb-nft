// SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.10 <0.9.0;

import "forge-std/Test.sol";
import "../src/WebbNFT.sol";

contract WebbNFTTest is Test {
    WebbNFT private nft;

    address private owner =
        vm.addr(uint256(keccak256(abi.encodePacked("owner"))));
    address private minter =
        vm.addr(uint256(keccak256(abi.encodePacked("minter"))));

    function setUp() public {
        console2.log("hi");
        nft = new WebbNFT("ipfs://lol", 5);

        console2.log("setting owner...");
        nft.setOwner(owner);
        assertEq(nft.owner(), owner);

        vm.deal(owner, 10 ether);
        vm.deal(minter, 10 ether);
    }

    function testSetMaxID() public {
        assertEq(nft.maxID(), 5); // default, from above

        vm.prank(owner);
        nft.setMaxID(666);
        assertEq(nft.maxID(), 666);

        vm.expectRevert("UNAUTHORIZED");
        vm.prank(minter);
        nft.setMaxID(42);
        assertEq(nft.maxID(), 666); // old value
    }

    function testSetBaseURI() public {
        assertEq(nft.baseURI(), "ipfs://lol"); // default, from above

        vm.prank(owner);
        nft.setBaseURI("ipfs://ok/");
        assertEq(nft.baseURI(), "ipfs://ok/");

        vm.expectRevert("UNAUTHORIZED");
        vm.prank(minter);
        nft.setBaseURI("ipfs://else/");
        assertEq(nft.baseURI(), "ipfs://ok/"); // old value
    }

    function testSetEnabled() public {
        assertEq(nft.enabled(), true); // default, from above

        vm.prank(owner);
        nft.setEnabled(false);
        assertEq(nft.enabled(), false);

        vm.expectRevert("UNAUTHORIZED");
        vm.prank(minter);
        nft.setEnabled(false);
        assertEq(nft.enabled(), false); // old value
    }

    function testMint() public {
        assertEq(nft.balanceOf(minter, 1), 0);
        vm.prank(minter);
        nft.mint(1);
        assertEq(nft.balanceOf(minter, 1), 1);

        assertEq(nft.balanceOf(minter, 5), 0);
        vm.prank(minter);
        nft.mint(5);
        assertEq(nft.balanceOf(minter, 5), 1);

        vm.expectRevert(WebbNFT.TokenDoesNotExist.selector);
        vm.prank(minter);
        nft.mint(6);
    }

    function testMintFailsIfDisabled() public {
        vm.prank(owner);
        nft.setEnabled(false);

        vm.prank(minter);
        vm.expectRevert(WebbNFT.MintingNotEnabled.selector);
        nft.mint(1);
    }

    function testUri() public {
        vm.prank(owner);
        nft.setBaseURI("ipfs://ok/");
        console2.log("nft.uri(1)", nft.uri(1));
        assertEq(nft.uri(1), "ipfs://ok/1");
    }
}
