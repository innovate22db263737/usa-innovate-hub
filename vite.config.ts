// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only, target configurable below),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deploying on Vercel: tell Nitro to emit a Vercel Build Output (v3) bundle
// at `.vercel/output/`. Vercel auto-detects this directory — no vercel.json required.
// We intentionally do NOT redirect the TanStack Start server entry to src/server.ts here,
// because that file exports a Cloudflare Workers–style `{ fetch }` handler. The default
// TanStack Start server entry works with the Vercel preset.
export default defineConfig({
  nitro: {
    preset: "vercel",
  },
});
