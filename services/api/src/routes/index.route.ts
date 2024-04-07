import { Hono } from "hono";

export const indexRoute = new Hono().get("/", (c) => c.json({ ok: true }));
