import path from "node:path";
import { defineConfig } from "vitest/config";

const calcRoot = path.resolve(__dirname, "packages/calculators-core/src");

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@\/lib\/calculators\/(.*)$/,
        replacement: `${calcRoot}/$1`,
      },
      { find: "@", replacement: path.resolve(__dirname, ".") },
    ],
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", "packages/calculators-core/src/**/*.test.ts"],
  },
});
