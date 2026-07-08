import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

/** Built file at repo root — required for HACS install from GitHub */
export default {
  input: "src/heating-visualizer-card.ts",
  output: {
    file: "heating-visualizer-card.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    resolve({ browser: true }),
    typescript(),
    terser({ format: { comments: false } }),
  ],
};
