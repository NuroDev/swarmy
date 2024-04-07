ARG BUN_VERSION=1.0.36-alpine
FROM oven/bun:$BUN_VERSION AS base

WORKDIR /usr/src/app

RUN apk --no-cache add curl

# ------------------------------------------------------------------

FROM base AS dev-deps

WORKDIR /tmp/dev

COPY package.json bun.lockb bunfig.toml .
COPY patches/ .
COPY services/api/package.json services/api/package.json

# TODO(@nurodev): Remove this once the issue is fixed.
# Bun is dumb in monorepos. Trying to build service A, but the lock
# file includes the dependencies of service B, C, etc & so on.
# https://github.com/oven-sh/bun/issues/5792#issuecomment-1826018278
RUN bun install && rm -rf ./node_modules/

RUN bun install --frozen-lockfile

# ------------------------------------------------------------------

FROM base AS prod-deps

WORKDIR /tmp/prod

COPY package.json bun.lockb bunfig.toml .
COPY patches/ .
COPY services/api/package.json services/api/package.json

# TODO(@nurodev): Remove this once the issue is fixed.
# Bun is dumb in monorepos. Trying to build service A, but the lock
# file includes the dependencies of service B, C, etc & so on.
# https://github.com/oven-sh/bun/issues/5792#issuecomment-1826018278
RUN bun install && rm -rf ./node_modules/

RUN bun install --frozen-lockfile --production

# ------------------------------------------------------------------

FROM base AS build

COPY --from=dev-deps /tmp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production

RUN cd services/api && bun run build

# ------------------------------------------------------------------

FROM base AS runtime

COPY --from=prod-deps /tmp/prod/node_modules node_modules
COPY --from=build /usr/src/app/services/api/package.json .
COPY --from=build /usr/src/app/services/api/dist/index.js ./dist/index.js

USER bun

EXPOSE 3000/tcp

ENTRYPOINT [ "bun", "run", "start" ]

HEALTHCHECK --interval=30s \
	--timeout=30s \
	--start-period=1s \
	--retries=3 \
	CMD curl -s -f http://localhost:3000/health || exit 1
