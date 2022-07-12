// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ERC721Base} from "./ERC721Base.sol";

contract WebbNFT is ERC721Base {
    constructor() ERC721Base("Example NFT", "EXAMPLE", 0.1 ether, 10_000) {}

    function mint(uint256 numToBeMinted)
        external
        payable
        hasExactPayment(numToBeMinted)
        withinMintLimit(4, numToBeMinted)
    {
        _mintMany(_msgSender(), numToBeMinted);
    }
}
