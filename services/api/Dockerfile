ARG NODE_VERSION=lts-alpine
FROM node:$NODE_VERSION AS base

WORKDIR /usr/src/app

# Required for health checks
RUN apk --no-cache add curl

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ------------------------------------------------------------------

FROM base AS dev-deps

WORKDIR /tmp/dev

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
COPY services/api/package.json services/api/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ------------------------------------------------------------------

FROM base AS prod-deps

WORKDIR /tmp/prod

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
COPY services/api/package.json services/api/package.json

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# ------------------------------------------------------------------

FROM base AS build

COPY --from=dev-deps /tmp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production

RUN cd services/api && pnpm run build

# ------------------------------------------------------------------

FROM base AS runtime

COPY --from=prod-deps /tmp/prod/node_modules node_modules
COPY --from=build /usr/src/app/services/api/package.json .
COPY --from=build /usr/src/app/services/api/dist/index.js ./dist/index.js

EXPOSE 3000/tcp

ENTRYPOINT [ "pnpm", "run", "start" ]

HEALTHCHECK --interval=30s \
	--timeout=30s \
	--start-period=1s \
	--retries=3 \
	CMD curl -s -f http://localhost:3000/health || exit 1
