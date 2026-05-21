import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",   // CORRECT FOR VERCEL
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/fertibase-app-[hash].js",
        chunkFileNames: "assets/fertibase-chunk-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/fertibase-styles-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
