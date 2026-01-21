import { cpSync, rmSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const sourceDir = resolve("prompts");
const targetDir = resolve("dist", "scripts", "prompts");

if (!existsSync(sourceDir)) {
  process.exit(0);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });
