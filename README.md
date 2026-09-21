# NovaMart Stores — concept e-commerce application

**Part of the Kleepex Solutions program.** NovaMart is a fully working concept online store
demonstrating what a Kleepex-built e-commerce solution includes. All products, prices (₦) and
orders are **fictional**.

## What's inside

**Storefront** (`/`)
- 24-product catalog across Electronics, Fashion, Home & Living, Beauty, Groceries
- Live search, category filters and price/name sorting
- Product detail pages with stock states and quantity picker
- Cart (persistent via localStorage) with quantity controls
- Checkout with Nigerian states, delivery methods (pickup / metro / nationwide)
- Server-side order validation: prices re-checked, stock verified & decremented
- Order confirmation with reference (e.g. `NM-00031`)

**Admin** (`/admin`)
- Sign-in protected (signed-cookie session, guard middleware)
- Dashboard: revenue, orders, products, low-stock KPIs + stock alerts
- Products: full create / edit / delete
- Orders: list, filter by status, detail view, status updates
  (Pending → Confirmed → Shipped → Delivered / Cancelled)

**Demo admin credentials:** `admin@novamart.demo` / `novamart123`

## Run it

```bash
npm install
npm run dev        # dev server → http://localhost:4321
npm run build      # production build
npm start          # serve production build (set HOST/PORT env as needed)
```

## Architecture

- **Astro 5 SSR** with `@astrojs/node` (standalone) — server-rendered pages + form-action APIs
- **Embedded JSON database** at `data/store.db.json` (auto-seeded on first run, git-ignored).
  All data access goes through `src/lib/db.js` — swap the storage engine for SQLite / Turso /
  Postgres in that one file for production.
- **Sessions:** HMAC-signed cookie auth (`src/lib/session.js`); set `NOVAMART_SECRET` in
  production. For real deployments, plug in a full auth provider.
- **Catalog seed:** `src/data/catalog.js` — replace with real inventory when a client adopts it.

## Production upgrade path (recommended when going live)

1. Swap embedded JSON DB → hosted database (e.g. *Turso* or *Postgres*) in `src/lib/db.js`
2. Add payments: Paystack or Flutterwave checkout integration
3. Order notifications: email/WhatsApp via a provider (e.g. Resend, Termii)
4. Real product images in `public/products/` + richer storefront SEO
5. Deploy: any Node host (Render, Railway, VPS). For Vercel, use the `@astrojs/vercel`
   adapter together with a hosted database.

## Deploy to a Node host

NovaMart is set up for Astro's Node standalone adapter, so it works on Render, Railway, Fly.io,
Koyeb, or any VPS that can run `npm install && npm run build && npm start`.

### Required environment variables

Create a `.env` file or configure these values in your host dashboard:

```bash
NOVAMART_SECRET=change-this-to-a-long-random-secret
PUBLIC_URL=https://your-app.example.com
HOST=0.0.0.0
PORT=4321
NOVAMART_DB_PATH=./data/store.db.json
```

- `NOVAMART_SECRET` protects the admin session cookie.
- `PUBLIC_URL` sets the deployed site origin for Astro URL generation.
- `HOST` and `PORT` are used by the standalone Node server.
- `NOVAMART_DB_PATH` lets you point data storage to a mounted volume or persistent directory.

### Render example

1. Create a new Web Service from this repository.
2. Set the build command to `npm install && npm run build`.
3. Set the start command to `npm start`.
4. Add the environment variables above.
5. Make sure the app has a persistent disk or use a real database before production traffic.

### Railway example

1. Import the repo and choose the Node environment.
2. Add the same env vars.
3. Keep the default `npm install && npm run build` + `npm start` flow.
4. Optionally mount a persistent volume for `data/` if you want to keep the JSON DB between deploys.

> Best practice: the current JSON DB is suitable for a demo, but a production deployment should move to a hosted database such as Postgres or Turso and swap the logic in `src/lib/db.js`.

---
© 2026 NovaMart Stores (concept) — designed & engineered by **Kleepex**.
