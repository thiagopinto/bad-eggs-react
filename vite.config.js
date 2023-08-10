import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      process: {
        env: { ...process.env, ...loadEnv(mode, process.cwd(), "") },
      },
    },
    plugins: [react()],
    root: "./",
    build: {
      outDir: "dist",
    },
    base: "/eggs/",
  };
});
