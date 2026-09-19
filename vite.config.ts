import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { nitro } from "nitro/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

if (process.env.VERCEL && !process.env.NITRO_PRESET) {
  process.env.NITRO_PRESET = "vercel";
}

export default defineConfig(({ command }) => {
  const isNetlify = Boolean(process.env.NETLIFY);

  return {
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      host: true,
      allowedHosts: true,
    },
    build: {
      rolldownOptions: {
        experimental: {
          chunkOptimization: false,
        },
      },
    },
    plugins: [
      tailwindcss(),
      tanstackStart(),
      react(),
      command === "build"
        ? isNetlify
          ? netlify()
          : nitro()
        : null,
    ],
  };
});
