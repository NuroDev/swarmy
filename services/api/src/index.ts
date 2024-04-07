import { showRoutes } from "hono/dev";
import { app } from "~/router";

const server = Bun.serve({
  fetch: (request, server) => app.fetch(request, { server }),
  port: Bun.env.PORT || 3000,
});
console.log(`Started server ${server.url}`);
showRoutes(app);

function exit() {
  server.stop();
  process.exit();
}

process.on("SIGINT", exit);
process.on("SIGTERM", exit);
process.on("exit", exit);
