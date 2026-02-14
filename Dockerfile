FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install Bun
RUN npm install -g bun

# Install dependencies
RUN bun install --frozen-lockfile

# Copy project files
COPY . .

# Build application
RUN bun run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy package.json and install production dependencies
COPY package.json ./
RUN npm install -g bun && bun install --production

# Copy build output from builder stage (adapter-node defaults to .svelte-kit/output/)
COPY --from=builder /app/.svelte-kit/output ./build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "build/server/index.js"]
