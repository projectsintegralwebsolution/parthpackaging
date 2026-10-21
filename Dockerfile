# Production Dockerfile for Dokploy Deployment
# Builds both Next.js frontend and Express backend using Node.js 20

FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# 1. Dependencies Stage
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm install --include=optional
RUN npm install --prefix backend

# 2. Builder Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# 3. Runner Stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV BACKEND_PORT=5000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application and runner
COPY --from=builder /app ./

EXPOSE 3000

CMD ["node", "server-runner.js"]
