import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createSWCTransformDepsPlugin } from "@preact-signals/safe-react/integrations/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // for `@preact-signals/utils`
      "@preact/signals-react": "@preact-signals/safe-react",
    },
  },
  plugins: [
    // for `@preact-signals/utils`
    createSWCTransformDepsPlugin({
      filter: (id) => {
        return id.includes("node_modules");
      },
    }),
    react({
      plugins: [["@preact-signals/safe-react/swc", {}]],
    }),
  ],
});
