import { Hono } from "hono";

export const healthRoute = new Hono().get("/health", (c) => c.text("OK", 200));
