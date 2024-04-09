import { defineConfig } from "tsup";

export default defineConfig(({ watch = false, onSuccess }) => ({
  clean: true,
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  onSuccess,
  watch,
}));
