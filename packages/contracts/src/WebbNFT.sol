// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import {Owned} from "solmate/auth/Owned.sol";
import {ERC1155} from "solmate/tokens/ERC1155.sol";

contract WebbNFT is Owned, ERC1155 {
    string public baseURI;
    uint256 public maxID;

    error TokenDoesNotExist();

    event BaseURIUpdated(string newBaseURI);
    event MaxIDUpdated(uint256 newMaxID);

    modifier tokenExists(uint256 id) {
        if (id > maxID) {
            revert TokenDoesNotExist();
        }
        _;
    }

    constructor(string memory _baseURI, uint256 _maxID) Owned(msg.sender) {
        baseURI = _baseURI;
        maxID = _maxID;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
        emit BaseURIUpdated(_baseURI);
    }

    function setMaxID(uint256 _maxID) public onlyOwner {
        maxID = _maxID;
        emit MaxIDUpdated(_maxID);
    }

    function mint(uint256 id) public tokenExists(id) {
        _mint(msg.sender, id, 1, "");
    }

    function uri(uint256 id)
        public
        view
        override
        tokenExists(id)
        returns (string memory)
    {
        return string.concat(baseURI, Strings.toString(id));
    }
}

// ripped from OZ Strings
library Strings {
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
