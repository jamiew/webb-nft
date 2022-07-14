# go_webb_go.sol

![A collage of images from this collection](https://dl.dropboxusercontent.com/s/ylluedjt6ykpoa8/webb-mint-collage%2520%25281%2529.png)

Free commemorative NFTs of the first images from the James Webb Space Telescope (JWST)

Deployments:

- Mainnet: [0xF639B4EbB77DF1ed4b5014C244F60E72B8AdB29b](https://etherscan.io/address/0xf639b4ebb77df1ed4b5014c244f60e72b8adb29b)
- Goerli: [0x3Ed96FC9Aeb5e987E0ef8f6B126213d33A0f1358](https://goerli.etherscan.io/address/0x3Ed96FC9Aeb5e987E0ef8f6B126213d33A0f1358)

This repository was forked from the amazing [web3-scaffold](https://github.com/holic/web3-scaffold) at commit [b126e1e7e9](https://github.com/holic/web3-scaffold/commit/b126e1e7e9ca8acc7b8e31197dbaee2c2d7cba1c)

The smart contract is an ERC-1155 built using [Solmate](https://github.com/Rari-Capital/solmate) and [Foundry (forge)](https://github.com/foundry-rs/foundry)

Assets are stored on the appropriately-named [Interplanetary File System (IPFS)](https://ipfs.io)

![Speed Project Approved: <4 hours](https://dl.dropboxusercontent.com/s%2Ftfazrdzp0rjijkg%2Fspeedproject_time_4h.png)

## Setup

Install the [pnpm](https://pnpm.io/) package manager and run:

```sh
pnpm install
```

To build & test contracts, install [foundry](https://github.com/foundry-rs/foundry):

```sh
cd packages/contracts
forge test
```

To deploy contracts, check out `packages/contracts/script/WebbNFT.s.sol`

There's no frontend yet

## License

All source code here is (c) 2022 [@jamiew](https://jamiedubs.com/) and made freely available under an [MIT license](https://opensource.org/licenses/MIT)

Images are (c) [NASA/STScI](https://nasa.gov) and [available in the public domain](https://webbtelescope.org/copyright) <3
