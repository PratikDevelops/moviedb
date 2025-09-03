import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    allowedHosts: [
      ".csb.app",
      ".stackblitz.io",
      ".gitpod.io",
      ".loca.lt",
      "localhost",
      "127.0.0.1",
    ],
  },
});
