FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN npm install -g bun && bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.svelte-kit/output ./build
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build/server/index.js"]
