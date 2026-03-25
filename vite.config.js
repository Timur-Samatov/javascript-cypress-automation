import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "cypress"),
      "@pages": path.resolve(__dirname, "cypress/pages"),
      "@components": path.resolve(__dirname, "cypress/pages/components"),
      "@support": path.resolve(__dirname, "cypress/support"),
    },
  },
});