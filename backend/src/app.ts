import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/errorHandler.js";
import { config } from "./config/env.js";

export function createApp(): Express {
  const app = express();

  // 1. Trust reverse proxy (e.g., NGINX, Cloudflare, Vercel, Railway, Render)
  app.set("trust proxy", 1);

  // 2. Helmet Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // 3. CORS Configuration
  const allowedOrigins = [
    config.frontendUrl.replace(/\/$/, ""),
    "https://parthpackaging.com",
    "http://localhost:3000",
    "http://localhost:3005",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3005",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server proxies)
        if (!origin) return callback(null, true);
        if (
          allowedOrigins.includes(origin) ||
          config.nodeEnv === "development"
        ) {
          return callback(null, true);
        }
        return callback(
          new Error(`CORS blocked: Origin ${origin} is not allowed.`)
        );
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      credentials: true,
      maxAge: 86400, // 24 hours
    })
  );

  // 4. Request Body Parsers with 50KB safety limit
  app.use(express.json({ limit: "50kb" }));
  app.use(express.urlencoded({ extended: true, limit: "50kb" }));

  // 5. Mount API Routes
  app.use(enquiryRoutes);

  // 6. 404 Handler
  app.use(notFoundHandler);

  // 7. Global Error Handler
  app.use(globalErrorHandler);

  return app;
}
