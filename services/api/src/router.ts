import { Hono } from "hono";

import { healthRoute } from "~/routes/health.route";
import { indexRoute } from "~/routes/index.route";

export const app = new Hono().route("/", indexRoute).route("/", healthRoute);

export type App = typeof app;
