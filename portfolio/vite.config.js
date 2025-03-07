import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  // Optional: Add server settings if needed (e.g., for HMR)
  server: {
    host: true, // Allows access from network (e.g., via IP)
    port: 5173, // Default Vite port
    open: true, // Opens browser automatically
  },
});