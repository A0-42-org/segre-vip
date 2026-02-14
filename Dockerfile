FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install Bun and dependencies
RUN npm install -g bun && bun install

# Copy project files
COPY . .

# Build SvelteKit application
RUN bun run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/build ./

# Copy package.json for production dependencies
COPY package.json ./

# Install production dependencies only
RUN npm install -g bun && bun install --production

# Expose port 3000 (default for adapter-node)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
