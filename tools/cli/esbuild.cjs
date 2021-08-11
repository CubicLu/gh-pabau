const { nodeExternalsPlugin } = require('esbuild-node-externals');
const esbuild = require('esbuild');

console.log("Compiling apps/bridge-api/src/main.ts ...")

esbuild.build({
  entryPoints: ["apps/bridge-api/src/main.ts"],
  bundle: true,
  format: "cjs",
  platform: "node",
  outfile: "dist/asdf/main.cjs",
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
})
  .then(() => console.log("Compiled."))
  .catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["apps/bridge-api/src/schema.ts"],
  bundle: true,
  format: "cjs",
  platform: "node",
  outfile: "dist/asdf/bridge-api-nexus.cjs",
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
})
  .then(() => console.log("Compiled."))
  .catch(() => process.exit(1));
