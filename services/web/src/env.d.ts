/// <reference types="astro/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_URL: string;
    readonly HOST: string;
    readonly HOSTNAME: string;
    readonly NODE_ENV: "development" | "production";
    readonly PORT: string;
  }
}

declare module "bun" {
  interface Env extends NodeJS.ProcessEnv {}
}

interface ImportMetaEnv {
  readonly API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
