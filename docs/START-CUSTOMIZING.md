The frontend is a static Vite + React app, not a contract-deployment scaffold. Start with `pnpm install` and `pnpm dev` from the repository root.

- Edit `packages/app/src/App.tsx`, `NFTEntry.tsx` and `styles/globals.css` for content/layout. Replace local JPEGs in `packages/app/public/thumbnails` rather than adding runtime image processing.
- Wallet discovery lives in `EthereumProviders.tsx` and `wallet.ts`. Mint requests use the existing mainnet addresses and ABI signatures in `contracts.ts`; changes there require transaction and account/chain safety tests.
- Run `pnpm lint`, `pnpm test` and `pnpm build`. Contract tests require Foundry 1.9.0 and initialized Git submodules. Frontend builds need neither contract artifacts nor credentials.
- Contract source, tests and deployment scripts live in `packages/contracts`. Forge uses the pinned Solidity 0.8.15 compiler and Git submodules; keep them unchanged when editing the frontend. Build output and caches are ignored (`.forge-out`, `.forge-cache` and legacy `packages/contracts/out`). The frontend's inline ABI signatures do not need generated JSON.
- Preview deployment scripts from the repository root against the intended RPC before broadcasting. The multimint script targets the existing mainnet NFT contract; use a mainnet RPC. Do not pass private keys on the command line or commit broadcast logs.

Vercel configuration lives in `vercel.json`. Keep the project rooted at the repository root; publish `packages/app/dist`. Any new remote resource must also fit the Content Security Policy. Never add private keys to frontend environment variables or committed files.
