import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");

const files = ["index.html", "styles.css", "script.js"];
const dirs = ["assets", "public"];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const file of files) {
  const src = join(root, file);
  if (!existsSync(src)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
  copyFileSync(src, join(out, file));
  console.log(`Copied ${file}`);
}

for (const dir of dirs) {
  const src = join(root, dir);
  if (!existsSync(src)) {
    console.error(`Missing required folder: ${dir}`);
    process.exit(1);
  }
  cpSync(src, join(out, dir), { recursive: true });
  console.log(`Copied ${dir}/`);
}

console.log("Build complete → dist/");
