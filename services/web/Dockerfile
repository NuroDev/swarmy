ARG BUN_VERSION=1.0.36-alpine
FROM oven/bun:$BUN_VERSION AS base

WORKDIR /usr/src/app

# ------------------------------------------------------------------

FROM base AS install

WORKDIR /tmp/

RUN mkdir -p /tmp/dev
COPY package.json bun.lockb bunfig.toml /tmp/dev/
COPY patches/ /tmp/dev/patches/
COPY services/web/package.json /tmp/dev/services/web/package.json
RUN cd /tmp/dev && bun install --frozen-lockfile

RUN mkdir -p /tmp/prod
COPY package.json bun.lockb bunfig.toml /tmp/prod/
COPY patches/ /tmp/prod/patches/
COPY services/web/package.json /tmp/prod/services/web/package.json
RUN cd /tmp/prod && bun install --frozen-lockfile --production

# ------------------------------------------------------------------

FROM base AS build

COPY --from=install /tmp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production

RUN cd services/web && bun run build

# ------------------------------------------------------------------

FROM base AS runtime

COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=build /usr/src/app/services/web/package.json .
COPY --from=build /usr/src/app/services/web/dist ./dist

USER bun

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321/tcp

ENTRYPOINT [ "bun", "run", "start" ]
