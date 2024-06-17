FROM node:20-alpine as builder

WORKDIR /build
COPY . .

RUN npm i -g pnpm && pnpm i && pnpm build && pnpm drizzle-kit push

FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /build/.next/standalone/ .
COPY --from=builder /build/.next/static ./.next/static
COPY --from=builder /build/sqlite.db .

RUN mkdir public

ENTRYPOINT [ "node", "./server.js" ]