# go_webb_go.sol

![A collage of images from this collection](https://dl.dropboxusercontent.com/s/ylluedjt6ykpoa8/webb-mint-collage%2520%25281%2529.png)

Free commemorative NFTs of the first James Webb Space Telescope images, with a static Vite + React frontend.

Originally forked from [web3-scaffold](https://github.com/holic/web3-scaffold) at [b126e1e7e9](https://github.com/holic/web3-scaffold/commit/b126e1e7e9ca8acc7b8e31197dbaee2c2d7cba1c).

The smart contract is an ERC-1155 built using [Solmate](https://github.com/Rari-Capital/solmate) and [Foundry (forge)](https://github.com/foundry-rs/foundry)

Assets are stored on the appropriately-named [Interplanetary File System (IPFS)](https://ipfs.io)

![Speed Project Approved: <4 hours](https://dl.dropboxusercontent.com/s%2Ftfazrdzp0rjijkg%2Fspeedproject_time_4h.png)

## Deployments

Live site: [webb.jamiedubs.com](https://webb.jamiedubs.com). The frontend uses React, TypeScript, Vite, Tailwind and viem.

Use a wallet extension or a wallet's in-app browser on Ethereum mainnet. Minting is free, but Ethereum gas fees still apply. WalletConnect/QR connections are not supported.

WebbNFT:

- Mainnet: [0xF639B4EbB77DF1ed4b5014C244F60E72B8AdB29b](https://etherscan.io/address/0xf639b4ebb77df1ed4b5014c244f60e72b8adb29b)

WebbMultimint:

- Mainnet: [0x3Ed96FC9Aeb5e987E0ef8f6B126213d33A0f1358](https://etherscan.io/address/0x3ed96fc9aeb5e987e0ef8f6b126213d33a0f1358)

## Setup

Use Node 22.23.4, pnpm 12.16.1 and [Foundry 1.9.0](https://github.com/foundry-rs/foundry/releases/tag/v1.9.0):

```sh
git submodule update --init --recursive
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm build
```

The app opens at http://127.0.0.1:5173. Vercel serves `packages/app/dist`; no server or image optimizer runs in production.

No API keys or frontend environment files are required. Tests never broadcast transactions.

Dependabot checks npm and GitHub Actions weekly. Contract tests compile to ignored `.forge-out`; committed `packages/contracts/out` files are historical artifacts. See the [maintenance guide](docs/START-CUSTOMIZING.md) for production checks and their limits.

## License

All source code here is (c) 2022 [@jamiew](https://jamiedubs.com/) and made freely available under an [MIT license](https://opensource.org/licenses/MIT)

Images are (c) [NASA/STScI](https://nasa.gov) and [available in the public domain](https://webbtelescope.org/copyright) <3
