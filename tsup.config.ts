import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: "build",
  format: ["esm"],
  bundle: true,
  minify: true,
});
