FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json bun.lock ./
RUN npm install -g bun
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./
COPY package.json ./
RUN npm install -g bun
RUN bun install --production --frozen-lockfile

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "index.js"]
