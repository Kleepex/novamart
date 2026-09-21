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

**Admin credentials:** `admin@novamart.demo` / `novamart123`

## Run it

```bash
npm install
npm run dev        # dev server → http://localhost:4321
npm run build      # production build (.vercel/output)
npm run preview    # preview the production build locally
```

## Architecture
- **Astro 5 SSR** with `@astrojs/vercel` — server-rendered pages + form-action APIs
deployed as Vercel Serverless Functions
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
5. Deploy to Vercel (`@astrojs/vercel` adapter, already configured).

## Deploy to Vercel
NovaMart uses the `@astrojs/vercel` adapter, so it deploys as Vercel Serverless Functions.
Vercel auto-detects the build command (`npm install && npm run build`) and produces the
Build Output API bundle in `.vercel/output`. No start command is needed.

### Required environment variables (Vercel → Project → Settings → Environment Variables)

```bash
NOVAMART_SECRET=change-this-to-a-long-random-secret
PUBLIC_URL=https://your-app.example.com
```

- `NOVAMART_SECRET` protects the admin session cookie. **Set this in production** — the
  built-in fallback secret is public and would let anyone forge an admin session.
- `PUBLIC_URL` sets the deployed site origin for Astro URL generation.

### Steps
1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Astro** (auto-detected).
3. Add the environment variables above.
4. Deploy.

### ⚠️ Data persistence on Vercel

The demo stores data in a JSON file. Vercel's filesystem is **read-only except `/tmp`, and
`/tmp` does not persist** between invocations. The app detects Vercel and falls back to
`/tmp/novamart-store.db.json`, so it boots and browses correctly — but **orders placed and
products edited in the admin will not survive** a cold start or a new function instance.

The storefront and the read-only admin views work out of the box. To make writes persist,
swap the storage engine in `src/lib/db.js` for a hosted database (Turso, Postgres, Vercel KV)
before taking real traffic. Set `NOVAMART_DB_PATH` only on hosts with a persistent disk.

> Best practice: the current JSON DB is suitable for a demo, but a production deployment should move to a hosted database such as Postgres or Turso and swap the logic in `src/lib/db.js`.

---
© 2026 NovaMart Stores (concept) — designed & engineered by **Kleepex**.
