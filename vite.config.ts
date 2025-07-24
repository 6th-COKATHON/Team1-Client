import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@pages", replacement: "/src/pages" },
      { find: "@components", replacement: "/src/components" },
      { find: "@constants", replacement: "/src/constants" },
      { find: "@models", replacement: "/src/models" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@apis", replacement: "/src/apis" },
    ],
  },
});
