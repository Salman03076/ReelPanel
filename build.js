import * as esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

esbuild
  .build({
    entryPoints: ["./src/ts/index.ts"],
    sourcemap: true,
    bundle: true,
    outdir: "./docs/js",
    plugins: [
      copy({
        resolveFrom: "cwd",
        assets: [
          {
            from: [
              "./src/assets/**/*.{png,avif,jpg,jpeg,webp,gif,svg,mp3,wav,ogg,m4a}",
            ],
            to: ["./docs/assets"],
          },
          {
            from: ["./src/index.html"],
            to: ["./docs"],
          },
          {
            from: ["./src/css/style.css"],
            to: ["./docs/css"],
          },
        ],
      }),
    ],
  })
  .catch(() => process.exit(1));
