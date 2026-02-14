# Use Node.js 20 Alpine for base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and lock file
COPY package.json bun.lock ./

# Install Bun and dependencies
RUN npm install -g bun && bun install

# Copy all source files
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app/build ./

# Copy package.json
COPY package.json ./

# Install production dependencies only
RUN npm install -g bun && bun install --production

# Expose the application port
EXPOSE 3000

# Start the server
CMD ["node", "build/index.js"]
