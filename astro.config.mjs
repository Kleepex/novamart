import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

const site = process.env.PUBLIC_URL || undefined;

// NovaMart — Vercel deployment config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site,
  devToolbar: { enabled: false },
  // Demo app: allow same-origin form posts without a hard-coded
  // production origin (preview hosts vary). Session cookies remain
  // samesite=lax; enable a real origin check when deploying with `site`.
  security: { checkOrigin: false },
});
