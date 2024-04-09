import { Hono } from "hono";
import { logger } from "hono/logger";

import { healthRoute } from "./routes/health.route";
import { indexRoute } from "./routes/index.route";

export const app = new Hono()
  .use(logger())
  .route("/", indexRoute)
  .route("/", healthRoute);

export type App = typeof app;
