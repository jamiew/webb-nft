/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { WebbNFT, WebbNFTInterface } from "../WebbNFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_baseURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_maxID",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "TokenDoesNotExist",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "newBaseURI",
        type: "string",
      },
    ],
    name: "BaseURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaxID",
        type: "uint256",
      },
    ],
    name: "MaxIDUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "owners",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_baseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxID",
        type: "uint256",
      },
    ],
    name: "setMaxID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001a1638038062001a168339810160408190526200003491620000a4565b600080546001600160a01b031916339081178255604051909182917f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d76908290a350600362000083838262000218565b5060045550620002e4565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215620000b857600080fd5b82516001600160401b0380821115620000d057600080fd5b818501915085601f830112620000e557600080fd5b815181811115620000fa57620000fa6200008e565b604051601f8201601f19908116603f011681019083821181831017156200012557620001256200008e565b816040528281526020935088848487010111156200014257600080fd5b600091505b8282101562000166578482018401518183018501529083019062000147565b82821115620001785760008484830101525b969092015195979596505050505050565b600181811c908216806200019e57607f821691505b602082108103620001bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021357600081815260208120601f850160051c81016020861015620001ee5750805b601f850160051c820191505b818110156200020f57828155600101620001fa565b5050505b505050565b81516001600160401b038111156200023457620002346200008e565b6200024c8162000245845462000189565b84620001c5565b602080601f8311600181146200028457600084156200026b5750858301515b600019600386901b1c1916600185901b1785556200020f565b600085815260208120601f198616915b82811015620002b55788860151825594840194600190910190840162000294565b5085821015620002d45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61172280620002f46000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c806359672c0e11610097578063a22cb46511610066578063a22cb4651461022e578063e985e9c514610241578063ecacaf0b1461026f578063f242432a1461027857600080fd5b806359672c0e146101d55780636c0360eb146101e85780638da5cb5b146101f0578063a0712d681461021b57600080fd5b806313af4035116100d357806313af40351461017a5780632eb2c2d61461018f5780634e1273f4146101a257806355f804b3146101c257600080fd5b8062fdd58e146100f957806301ffc9a7146101375780630e89341c1461015a575b600080fd5b610124610107366004610e0d565b600160209081526000928352604080842090915290825290205481565b6040519081526020015b60405180910390f35b61014a610145366004610e50565b61028b565b604051901515815260200161012e565b61016d610168366004610e74565b6102dd565b60405161012e9190610ee5565b61018d610188366004610ef8565b610337565b005b61018d61019d366004610fa1565b6103b5565b6101b56101b036600461105c565b61065c565b60405161012e91906110c8565b61018d6101d0366004611122565b610792565b61018d6101e3366004610e74565b610803565b61016d610862565b600054610203906001600160a01b031681565b6040516001600160a01b03909116815260200161012e565b61018d610229366004610e74565b6108f0565b61018d61023c3660046111d3565b610934565b61014a61024f36600461120f565b600260209081526000928352604080842090915290825290205460ff1681565b61012460045481565b61018d610286366004611242565b6109a0565b60006301ffc9a760e01b6001600160e01b0319831614806102bc5750636cdb3d1360e11b6001600160e01b03198316145b806102d757506303a24d0760e21b6001600160e01b03198316145b92915050565b6060816004548111156103035760405163677510db60e11b815260040160405180910390fd5b600361030e84610b9e565b60405160200161031f9291906112ee565b60405160208183030381529060405291505b50919050565b6000546001600160a01b0316331461036a5760405162461bcd60e51b815260040161036190611375565b60405180910390fd5b600080546001600160a01b0319166001600160a01b0383169081178255604051909133917f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d769190a350565b8483146103f65760405162461bcd60e51b815260206004820152600f60248201526e0988a9c8ea890be9a92a69a82a8869608b1b6044820152606401610361565b336001600160a01b038916148061043057506001600160a01b038816600090815260026020908152604080832033845290915290205460ff165b61046d5760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b6044820152606401610361565b60008060005b8781101561052c5788888281811061048d5761048d61139b565b9050602002013592508686828181106104a8576104a861139b565b6001600160a01b038e166000908152600160209081526040808320898452825282208054939091029490940135955085939250906104e79084906113c7565b90915550506001600160a01b038a1660009081526001602090815260408083208684529091528120805484929061051f9084906113de565b9091555050600101610473565b50886001600160a01b03168a6001600160a01b0316336001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8b8b8b8b604051610580949392919061142c565b60405180910390a46001600160a01b0389163b156106275760405163bc197c8160e01b808252906001600160a01b038b169063bc197c81906105d49033908f908e908e908e908e908e908e90600401611487565b6020604051808303816000875af11580156105f3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061791906114eb565b6001600160e01b03191614610634565b6001600160a01b03891615155b6106505760405162461bcd60e51b815260040161036190611508565b50505050505050505050565b606083821461069f5760405162461bcd60e51b815260206004820152600f60248201526e0988a9c8ea890be9a92a69a82a8869608b1b6044820152606401610361565b8367ffffffffffffffff8111156106b8576106b861110c565b6040519080825280602002602001820160405280156106e1578160200160208202803683370190505b50905060005b8481101561078957600160008787848181106107055761070561139b565b905060200201602081019061071a9190610ef8565b6001600160a01b03166001600160a01b03168152602001908152602001600020600085858481811061074e5761074e61139b565b905060200201358152602001908152602001600020548282815181106107765761077661139b565b60209081029190910101526001016106e7565b50949350505050565b6000546001600160a01b031633146107bc5760405162461bcd60e51b815260040161036190611375565b60036107c8828261157d565b507f6741b2fc379fad678116fe3d4d4b9a1a184ab53ba36b86ad0fa66340b1ab41ad816040516107f89190610ee5565b60405180910390a150565b6000546001600160a01b0316331461082d5760405162461bcd60e51b815260040161036190611375565b60048190556040518181527f31a015d5774ea4299c3b65d82aa389e42a2b6203fa4cf011cf60b71c625bf61c906020016107f8565b6003805461086f906112ba565b80601f016020809104026020016040519081016040528092919081815260200182805461089b906112ba565b80156108e85780601f106108bd576101008083540402835291602001916108e8565b820191906000526020600020905b8154815290600101906020018083116108cb57829003601f168201915b505050505081565b806004548111156109145760405163677510db60e11b815260040160405180910390fd5b6109303383600160405180602001604052806000815250610ca7565b5050565b3360008181526002602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b336001600160a01b03871614806109da57506001600160a01b038616600090815260026020908152604080832033845290915290205460ff165b610a175760405162461bcd60e51b815260206004820152600e60248201526d1393d517d055551213d49256915160921b6044820152606401610361565b6001600160a01b038616600090815260016020908152604080832087845290915281208054859290610a4a9084906113c7565b90915550506001600160a01b038516600090815260016020908152604080832087845290915281208054859290610a829084906113de565b909155505060408051858152602081018590526001600160a01b03808816929089169133917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46001600160a01b0385163b15610b6d5760405163f23a6e6160e01b808252906001600160a01b0387169063f23a6e6190610b1a9033908b908a908a908a908a9060040161163d565b6020604051808303816000875af1158015610b39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b5d91906114eb565b6001600160e01b03191614610b7a565b6001600160a01b03851615155b610b965760405162461bcd60e51b815260040161036190611508565b505050505050565b606081600003610bc55750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610bef5780610bd981611684565b9150610be89050600a836116b3565b9150610bc9565b60008167ffffffffffffffff811115610c0a57610c0a61110c565b6040519080825280601f01601f191660200182016040528015610c34576020820181803683370190505b5090505b8415610c9f57610c496001836113c7565b9150610c56600a866116c7565b610c619060306113de565b60f81b818381518110610c7657610c7661139b565b60200101906001600160f81b031916908160001a905350610c98600a866116b3565b9450610c38565b949350505050565b6001600160a01b038416600090815260016020908152604080832086845290915281208054849290610cda9084906113de565b909155505060408051848152602081018490526001600160a01b0386169160009133917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46001600160a01b0384163b15610dc25760405163f23a6e6160e01b808252906001600160a01b0386169063f23a6e6190610d6f9033906000908990899089906004016116db565b6020604051808303816000875af1158015610d8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db291906114eb565b6001600160e01b03191614610dcf565b6001600160a01b03841615155b610deb5760405162461bcd60e51b815260040161036190611508565b50505050565b80356001600160a01b0381168114610e0857600080fd5b919050565b60008060408385031215610e2057600080fd5b610e2983610df1565b946020939093013593505050565b6001600160e01b031981168114610e4d57600080fd5b50565b600060208284031215610e6257600080fd5b8135610e6d81610e37565b9392505050565b600060208284031215610e8657600080fd5b5035919050565b60005b83811015610ea8578181015183820152602001610e90565b83811115610deb5750506000910152565b60008151808452610ed1816020860160208601610e8d565b601f01601f19169290920160200192915050565b602081526000610e6d6020830184610eb9565b600060208284031215610f0a57600080fd5b610e6d82610df1565b60008083601f840112610f2557600080fd5b50813567ffffffffffffffff811115610f3d57600080fd5b6020830191508360208260051b8501011115610f5857600080fd5b9250929050565b60008083601f840112610f7157600080fd5b50813567ffffffffffffffff811115610f8957600080fd5b602083019150836020828501011115610f5857600080fd5b60008060008060008060008060a0898b031215610fbd57600080fd5b610fc689610df1565b9750610fd460208a01610df1565b9650604089013567ffffffffffffffff80821115610ff157600080fd5b610ffd8c838d01610f13565b909850965060608b013591508082111561101657600080fd5b6110228c838d01610f13565b909650945060808b013591508082111561103b57600080fd5b506110488b828c01610f5f565b999c989b5096995094979396929594505050565b6000806000806040858703121561107257600080fd5b843567ffffffffffffffff8082111561108a57600080fd5b61109688838901610f13565b909650945060208701359150808211156110af57600080fd5b506110bc87828801610f13565b95989497509550505050565b6020808252825182820181905260009190848201906040850190845b81811015611100578351835292840192918401916001016110e4565b50909695505050505050565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561113457600080fd5b813567ffffffffffffffff8082111561114c57600080fd5b818401915084601f83011261116057600080fd5b8135818111156111725761117261110c565b604051601f8201601f19908116603f0116810190838211818310171561119a5761119a61110c565b816040528281528760208487010111156111b357600080fd5b826020860160208301376000928101602001929092525095945050505050565b600080604083850312156111e657600080fd5b6111ef83610df1565b91506020830135801515811461120457600080fd5b809150509250929050565b6000806040838503121561122257600080fd5b61122b83610df1565b915061123960208401610df1565b90509250929050565b60008060008060008060a0878903121561125b57600080fd5b61126487610df1565b955061127260208801610df1565b94506040870135935060608701359250608087013567ffffffffffffffff81111561129c57600080fd5b6112a889828a01610f5f565b979a9699509497509295939492505050565b600181811c908216806112ce57607f821691505b60208210810361033157634e487b7160e01b600052602260045260246000fd5b60008084546112fc816112ba565b60018281168015611314576001811461132957611358565b60ff1984168752821515830287019450611358565b8860005260208060002060005b8581101561134f5781548a820152908401908201611336565b50505082870194505b50505050835161136c818360208801610e8d565b01949350505050565b6020808252600c908201526b15539055551213d49256915160a21b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000828210156113d9576113d96113b1565b500390565b600082198211156113f1576113f16113b1565b500190565b81835260006001600160fb1b0383111561140f57600080fd5b8260051b8083602087013760009401602001938452509192915050565b6040815260006114406040830186886113f6565b82810360208401526114538185876113f6565b979650505050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6001600160a01b0389811682528816602082015260a0604082018190526000906114b4908301888a6113f6565b82810360608401526114c78187896113f6565b905082810360808401526114dc81858761145e565b9b9a5050505050505050505050565b6000602082840312156114fd57600080fd5b8151610e6d81610e37565b60208082526010908201526f155394d0519157d49150d2541251539560821b604082015260600190565b601f82111561157857600081815260208120601f850160051c810160208610156115595750805b601f850160051c820191505b81811015610b9657828155600101611565565b505050565b815167ffffffffffffffff8111156115975761159761110c565b6115ab816115a584546112ba565b84611532565b602080601f8311600181146115e057600084156115c85750858301515b600019600386901b1c1916600185901b178555610b96565b600085815260208120601f198616915b8281101561160f578886015182559484019460019091019084016115f0565b508582101561162d5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6001600160a01b03878116825286166020820152604081018590526060810184905260a060808201819052600090611678908301848661145e565b98975050505050505050565b600060018201611696576116966113b1565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826116c2576116c261169d565b500490565b6000826116d6576116d661169d565b500690565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061145390830184610eb956fea164736f6c634300080f000a";

type WebbNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WebbNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WebbNFT__factory extends ContractFactory {
  constructor(...args: WebbNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _baseURI: PromiseOrValue<string>,
    _maxID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WebbNFT> {
    return super.deploy(_baseURI, _maxID, overrides || {}) as Promise<WebbNFT>;
  }
  override getDeployTransaction(
    _baseURI: PromiseOrValue<string>,
    _maxID: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_baseURI, _maxID, overrides || {});
  }
  override attach(address: string): WebbNFT {
    return super.attach(address) as WebbNFT;
  }
  override connect(signer: Signer): WebbNFT__factory {
    return super.connect(signer) as WebbNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WebbNFTInterface {
    return new utils.Interface(_abi) as WebbNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WebbNFT {
    return new Contract(address, _abi, signerOrProvider) as WebbNFT;
  }
}
