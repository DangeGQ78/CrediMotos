import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@react-pdf/renderer": "@react-pdf/renderer/lib/react-pdf.browser.js",
    }
  },
  server: {

    open: '/credimotos/dashboard',
  },

});
