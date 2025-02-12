import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build: {
  //   outDir: "dist",
  //   chunkSizeWarningLimit: 1000, // Default is 500 kB, increase to 1000 kB (1 MB)
  // },
});
