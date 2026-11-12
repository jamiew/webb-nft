This is a static Vite + React site for the existing Webb NFT contracts. Wallet discovery, mainnet checks and mint approvals run in the browser; Vercel serves files only.

- From the repository root: `pnpm dev`, `pnpm build`, and `pnpm --filter @web3-scaffold/app preview`.
- Edit `src/App.tsx` for content and `src/contracts.ts` for the reviewed contract addresses/signatures. Images live in `public/thumbnails` and are served directly.
- Browser/injected wallets only. No WalletConnect, API keys or environment files are required. `envDir: false` prevents Vite from loading old `.env` files.
- Styles use Tailwind CSS 4 through `@tailwindcss/vite`. Edit `src/styles/globals.css` for theme values; there is no Tailwind JavaScript or PostCSS configuration. The theme keeps the site's existing colors, and the button classes preserve its corner radius, shadow, border and cursor.
- Tailwind 4 requires Safari 16.4+, Chrome 111+ or Firefox 128+. Use a current Node 22 release for development (the DOM tests require at least Node 22.22.2).
