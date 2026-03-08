import { execSync } from "node:child_process";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set");
  process.exit(1);
}

function run(cmd) {
  console.log(`→ ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: process.env });
}

console.log("🚀 Running Drizzle migrations…");
run("npx drizzle-kit migrate --config drizzle.config.ts");
console.log("🎉 Database migrations completed.");
