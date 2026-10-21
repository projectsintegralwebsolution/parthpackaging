import { createApp } from "./app.js";
import { config, validateAndLogConfig } from "./config/env.js";

async function bootstrap() {
  validateAndLogConfig();

  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log(
      `✅ Parth Packaging Express server listening on http://localhost:${config.port}`
    );
    console.log(
      `👉 Enquiry Submission Endpoint: http://localhost:${config.port}/api/enquiries`
    );
    console.log(
      `👉 Health Status Endpoint: http://localhost:${config.port}/api/health`
    );
  });

  // Graceful shutdown handling
  const shutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log("HTTP server closed. Exiting process.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap().catch((err) => {
  console.error("Fatal error during backend server startup:", err);
  process.exit(1);
});
