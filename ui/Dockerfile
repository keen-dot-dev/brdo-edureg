FROM oven/bun AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
