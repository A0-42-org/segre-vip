FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy build output from builder
COPY --from=builder /app/build ./
COPY --from=builder /app/package.json ./

# Install production dependencies only
RUN npm install -g bun && bun install --production --frozen-lockfile || npm install --production

# Expose port
EXPOSE 3000

# Start the application
ENV HOST=0.0.0.0
ENV PORT=3000
CMD ["node", "index.js"]
