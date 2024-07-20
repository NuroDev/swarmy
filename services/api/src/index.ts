import { serve } from "@hono/node-server";
import { showRoutes } from "hono/dev";

import { app } from "./router";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const server = serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server running at http://localhost:${PORT}`);
showRoutes(app);

function exit() {
  server.close();
  process.exit();
}

process.on("SIGINT", exit);
process.on("SIGTERM", exit);
process.on("exit", exit);
