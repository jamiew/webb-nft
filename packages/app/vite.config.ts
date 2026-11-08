import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // The static app never needs the repository's deployment credentials.
  envDir: false,
  server: { host: "127.0.0.1" },
  preview: { host: "127.0.0.1" },
});
