const { spawn } = require("child_process");
const path = require("path");

const backendPort = process.env.BACKEND_PORT || "5000";
const frontendPort = process.env.PORT || "3000";

console.log("==================================================");
console.log("Parth Packaging Unified Production Runner");
console.log("==================================================");
console.log(`• Frontend Port (Next.js): ${frontendPort}`);
console.log(`• Backend Port (Express):  ${backendPort}`);
console.log("==================================================");

// 1. Spawn Express Backend Service
const backendScript = path.join(__dirname, "backend", "dist", "server.js");
const backendProcess = spawn(process.execPath, [backendScript], {
  stdio: "inherit",
  env: {
    ...process.env,
    PORT: backendPort,
    NODE_ENV: process.env.NODE_ENV || "production",
  },
});

backendProcess.on("error", (err) => {
  console.error("❌ Failed to start Express backend:", err);
});

backendProcess.on("exit", (code, signal) => {
  console.log(`⚠️ Express backend exited with code: ${code}, signal: ${signal}`);
  if (code !== 0 && code !== null) {
    process.exit(code);
  }
});

// 2. Spawn Next.js Production Server directly via Node
const nextScript = path.join(
  __dirname,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);
const frontendProcess = spawn(
  process.execPath,
  [nextScript, "start", "-p", frontendPort],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: frontendPort,
      BACKEND_API_URL: `http://127.0.0.1:${backendPort}`,
    },
  }
);

frontendProcess.on("error", (err) => {
  console.error("❌ Failed to start Next.js frontend:", err);
});

frontendProcess.on("exit", (code, signal) => {
  console.log(`⚠️ Next.js frontend exited with code: ${code}, signal: ${signal}`);
  if (code !== 0 && code !== null) {
    process.exit(code);
  }
});

// 3. Graceful shutdown handler
const shutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down all services...`);
  try {
    backendProcess.kill("SIGTERM");
  } catch {}
  try {
    frontendProcess.kill("SIGTERM");
  } catch {}
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
