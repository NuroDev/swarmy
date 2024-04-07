import type { APIRoute } from "astro";

export const GET: APIRoute = () => new Response("OK", { status: 200 });
