This is a static Vite + React site for the existing Webb NFT contracts. Wallet discovery, mainnet checks and mint approvals run in the browser; Vercel serves files only.

- From the repository root: `pnpm dev`, `pnpm build`, and `pnpm --filter @web3-scaffold/app preview`.
- Edit `src/App.tsx` for content and `src/contracts.ts` for the reviewed contract addresses/signatures. Images live in `public/thumbnails` and are served directly.
- Browser/injected wallets only. No WalletConnect, API keys or environment files are required. `envDir: false` prevents Vite from loading old `.env` files.
