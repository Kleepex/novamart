/**
 * NovaMart data layer — libSQL / Turso database.
 * ─────────────────
 * Every page calls these functions, never the database client
 * directly, so the schema can grow here without touching page code.
 *
 * Connections:
 *   - Production (Vercel): set TURSO_DATABASE_URL (+ TURSO_AUTH_TOKEN)
 *   - Local development:  falls back to a local SQLite file at
 *                         data/store.db (no credentials needed).
 *
 * All exports are async — remember to `await` them.
 */
import { createClient } from '@libsql/client';
import { join, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { PRODUCT_SEED, ORDER_SEED, DELIVERY_OPTIONS } from '../data/catalog.js';

// Local (non-Turso) mode stores a SQLite file under data/.
// Make sure the directory exists so a fresh clone works.
const LOCAL_DB_FILE = process.env.NOVAMART_DB_PATH
  ? process.env.NOVAMART_DB_PATH
  : join(process.cwd(), 'data', 'store.db');
if (!process.env.TURSO_DATABASE_URL) mkdirSync(dirname(LOCAL_DB_FILE), { recursive: true });

const LOCAL_DB_PATH = 'file:' + LOCAL_DB_FILE;

export const client = createClient({
  url: process.env.TURSO_DATABASE_URL || LOCAL_DB_PATH,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

let ready = null;

/** Creates tables on first use. Safe to call repeatedly. */
function bootstrap() {
  if (ready) return ready;
  ready = (async () => {
    await client.batch(
      [
        `CREATE TABLE IF NOT EXISTS products (
           id TEXT PRIMARY KEY,
           name TEXT NOT NULL,
           category TEXT NOT NULL,
           price INTEGER NOT NULL,
           stock INTEGER NOT NULL,
           blurb TEXT NOT NULL,
           color TEXT,
           image TEXT,
           sort_order INTEGER
         )`,
        `CREATE TABLE IF NOT EXISTS orders (
           ref TEXT PRIMARY KEY,
           id TEXT NOT NULL,
           seq INTEGER NOT NULL,
           customer TEXT,
           phone TEXT,
           email TEXT,
           address TEXT,
           city TEXT,
           state TEXT,
           delivery TEXT,
           items TEXT NOT NULL,
           subtotal INTEGER NOT NULL,
           delivery_fee INTEGER NOT NULL,
           total INTEGER NOT NULL,
           status TEXT NOT NULL,
           created_at TEXT NOT NULL
         )`,
        `CREATE TABLE IF NOT EXISTS admins (
           email TEXT PRIMARY KEY,
           password TEXT NOT NULL
         )`,
        `CREATE TABLE IF NOT EXISTS counters (
           name TEXT PRIMARY KEY,
           value INTEGER NOT NULL
         )`,
      ],
      'write'
    );
    await seedIfEmpty();
  })();
  return ready;
}

async function seedIfEmpty() {
  const { rows } = await client.execute('SELECT COUNT(*) AS n FROM products');
  if (Number(rows[0].n) > 0) return;

  const stmts = [];

  // Products — preserve catalog order via sort_order
  PRODUCT_SEED.forEach((p, i) => {
    stmts.push({
      sql: `INSERT INTO products (id, name, category, price, stock, blurb, color, image, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [p.id, p.name, p.category, p.price, p.stock, p.blurb,
             p.color ?? null, p.image ?? null, i],
    });
  });

  // Demo admin
  stmts.push({
    sql: 'INSERT INTO admins (email, password) VALUES (?, ?)',
    args: ['admin@novamart.demo', 'novamart123'],
  });

  // Demo orders (seeded without stock checks — see buildOrder)
  let seq = 1;
  for (const o of ORDER_SEED) {
    const built = buildOrder(o, seq, PRODUCT_SEED, false);
    stmts.push({
      sql: `INSERT INTO orders
              (ref, id, seq, customer, phone, email, address, city, state, delivery,
               items, subtotal, delivery_fee, total, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        built.ref, built.id, seq,
        built.customer, built.phone, built.email, built.address, built.city, built.state, built.delivery,
        JSON.stringify(built.items), built.subtotal, built.deliveryFee, built.total,
        built.status, built.createdAt,
      ],
    });
    seq++;
  }

  stmts.push({ sql: 'INSERT INTO counters (name, value) VALUES (?, ?)', args: ['order_seq', seq] });
  await client.batch(stmts, 'write');
}

/** Returns the next order sequence number, persisted across invocations. */
async function nextSeq() {
  const { rows } = await client.execute({
    sql: 'UPDATE counters SET value = value + 1 WHERE name = ? RETURNING value',
    args: ['order_seq'],
  });
  return Number(rows[0].value);
}

/** Maps a products row to the shape page code expects. */
const rowToProduct = (r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  price: Number(r.price),
  stock: Number(r.stock),
  blurb: r.blurb,
  color: r.color ?? undefined,
  image: r.image ?? undefined,
});

/** Maps an orders row to the shape page code expects. */
const rowToOrder = (r) => ({
  id: r.id,
  ref: r.ref,
  customer: r.customer ?? '',
  phone: r.phone ?? '',
  email: r.email ?? '',
  address: r.address ?? '',
  city: r.city ?? '',
  state: r.state ?? '',
  delivery: r.delivery ?? '',
  items: JSON.parse(r.items),
  subtotal: Number(r.subtotal),
  deliveryFee: Number(r.delivery_fee),
  total: Number(r.total),
  status: r.status,
  createdAt: r.created_at,
});

/* ── Products ─────────────────────── */
export async function getProducts({ q = '', category = '', sort = 'featured' } = {}) {
  await bootstrap();
  let sql = 'SELECT * FROM products';
  const filter = [];
  const args = [];
  if (q) {
    // Concatenate the searchable fields with a space, then match case-insensitively.
    filter.push("lower(name || ' || blurb || ' || category) LIKE ?");
    args.push('%' + q.toLowerCase() + '%');
  }
  if (category) {
    filter.push('category = ?');
    args.push(category);
  }
  if (filter.length) sql += ' WHERE ' + filter.join(' AND ');

  const order =
    sort === 'price-asc' ? 'price ASC'
    : sort === 'price-desc' ? 'price DESC'
    : sort === 'name' ? 'name ASC'
    : sort === 'stock' ? 'stock ASC'
    : 'sort_order ASC';
  sql += ' ORDER BY ' + order;

  const { rows } = await client.execute({ sql, args });
  return rows.map(rowToProduct);
}

export async function getProduct(id) {
  await bootstrap();
  const { rows } = await client.execute({ sql: 'SELECT * FROM products WHERE id = ?', args: [id] });
  return rows[0] ? rowToProduct(rows[0]) : null;
}

export async function saveProduct(data) {
  await bootstrap();

  if (data.id) {
    const existing = await getProduct(data.id);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    await client.execute({
      sql: `UPDATE products
            SET name = ?, category = ?, price = ?, stock = ?, blurb = ?, color = ?, image = ?
            WHERE id = ?`,
      args: [merged.name, merged.category, merged.price, merged.stock, merged.blurb,
             merged.color ?? null, merged.image ?? null, data.id],
    });
    return merged;
  }

  // Generate the next p### id from the current max
  const { rows } = await client.execute('SELECT id FROM products');
  const maxN = Math.max(0, ...rows.map((r) => parseInt(String(r.id).slice(1)) || 0));
  const id = 'p' + String(maxN + 1).padStart(3, '0');

  await client.execute({
    sql: `INSERT INTO products (id, name, category, price, stock, blurb, color, image, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, data.name, data.category, data.price, data.stock, data.blurb,
           data.color ?? null, data.image ?? null, rows.length],
  });
  return { ...data, id };
}

export async function deleteProduct(id) {
  await bootstrap();
  await client.execute({ sql: 'DELETE FROM products WHERE id = ?', args: [id] });
}

/* ── Orders ───────────────────────── */
/**
 * Validates items against the catalog and builds the order object.
 * Pass `products` to reuse a list already fetched this request.
 */
function buildOrder(data, seq, products, decrementStock = true) {
  const items = data.items.map((it) => {
    const p = products.find((pr) => pr.id === it.id);
    if (!p) throw new Error('Unknown product ' + it.id);
    const qty = Math.max(1, Math.min(99, parseInt(it.qty) || 1));
    if (decrementStock && p.stock < qty) throw new Error(`“${p.name}” is out of stock.`);
    return { productId: p.id, name: p.name, price: p.price, qty };
  });

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryFee = DELIVERY_OPTIONS[data.delivery]?.fee ?? 0;
  return {
    id: 'ord_' + seq,
    ref: 'NM-' + String(100000 + seq).slice(1),
    customer: String(data.customer || '').trim(),
    phone: String(data.phone || '').trim(),
    email: String(data.email || '').trim(),
    address: String(data.address || '').trim(),
    city: String(data.city || '').trim(),
    state: String(data.state || '').trim(),
    delivery: data.delivery,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    status: data.status || 'Pending',
    createdAt: data.createdAt || new Date().toISOString(),
  };
}

export async function createOrder(data) {
  await bootstrap();
  const products = await getProducts();
  const seq = await nextSeq();
  const order = buildOrder(data, seq, products, true);

  // Insert the order and decrement stock atomically.
  const stmts = [
    {
      sql: `INSERT INTO orders
              (ref, id, seq, customer, phone, email, address, city, state, delivery,
               items, subtotal, delivery_fee, total, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        order.ref, order.id, seq,
        order.customer, order.phone, order.email, order.address, order.city, order.state, order.delivery,
        JSON.stringify(order.items), order.subtotal, order.deliveryFee, order.total,
        order.status, order.createdAt,
      ],
    },
    ...order.items.map((it) => ({
      sql: 'UPDATE products SET stock = stock - ? WHERE id = ?',
      args: [it.qty, it.productId],
    })),
  ];
  await client.batch(stmts, 'write');
  return order;
}

export async function listOrders() {
  await bootstrap();
  const { rows } = await client.execute('SELECT * FROM orders ORDER BY seq DESC');
  return rows.map(rowToOrder);
}

export async function getOrder(ref) {
  await bootstrap();
  const { rows } = await client.execute({ sql: 'SELECT * FROM orders WHERE ref = ?', args: [ref] });
  return rows[0] ? rowToOrder(rows[0]) : null;
}

export async function updateOrderStatus(ref, status) {
  await bootstrap();
  await client.execute({ sql: 'UPDATE orders SET status = ? WHERE ref = ?', args: [status, ref] });
  return getOrder(ref);
}

/* ── Admin ────────────────────────── */
export async function findAdmin(email) {
  await bootstrap();
  const { rows } = await client.execute({
    sql: 'SELECT * FROM admins WHERE lower(email) = lower(?)',
    args: [String(email)],
  });
  return rows[0] ? { email: rows[0].email, password: rows[0].password } : null;
}

export async function getKpis() {
  await bootstrap();
  const orders = await listOrders();
  const active = orders.filter((o) => o.status !== 'Cancelled');
  const { rows: prodRows } = await client.execute('SELECT stock FROM products');
  const stocks = prodRows.map((r) => Number(r.stock));
  return {
    revenue: active.reduce((s, o) => s + o.total, 0),
    orders: orders.length,
    pending: orders.filter((o) => o.status === 'Pending').length,
    products: stocks.length,
    lowStock: stocks.filter((s) => s < 10).length,
    units: stocks.reduce((s, n) => s + n, 0),
  };
}
