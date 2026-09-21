/**
 * NovaMart data layer — embedded JSON-file database.
 * ─────────────────────────────────────────────────
 * Structured so the storage engine can be swapped for SQLite,
 * Turso or Postgres later without touching page code:
 * every page calls these functions, never the file directly.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCT_SEED, ORDER_SEED, DELIVERY_OPTIONS } from '../data/catalog.js';

const DEFAULT_DB_PATH = join(dirname(fileURLToPath(import.meta.url)), '../../data/store.db.json');
const DB_PATH = process.env.NOVAMART_DB_PATH ? resolve(process.cwd(), process.env.NOVAMART_DB_PATH) : DEFAULT_DB_PATH;

let cache = null;

function load() {
  if (cache) return cache;
  if (existsSync(DB_PATH)) {
    cache = JSON.parse(readFileSync(DB_PATH, 'utf8'));
  } else {
    cache = { products: PRODUCT_SEED, orders: [], admins: [{ email: 'admin@novamart.demo', password: 'novamart123' }], seq: 1 };
    // Seed demo orders through the real creation path (minus stock checks on old dates)
    for (const o of ORDER_SEED) cache.orders.push(buildOrder(o, false));
    persist();
  }
  return cache;
}

function persist() {
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const tmp = DB_PATH + '.tmp';
  writeFileSync(tmp, JSON.stringify(cache, null, 2));
  renameSync(tmp, DB_PATH); // atomic replace
}

/* ── Products ─────────────────────────────────────── */
export function getProducts({ q = '', category = '', sort = 'featured' } = {}) {
  const db = load();
  let list = [...db.products];
  if (q) {
    const needle = q.toLowerCase();
    list = list.filter((p) => (p.name + ' ' + p.blurb + ' ' + p.category).toLowerCase().includes(needle));
  }
  if (category) list = list.filter((p) => p.category === category);
  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'stock') list.sort((a, b) => a.stock - b.stock);
  return list;
}

export const getProduct = (id) => load().products.find((p) => p.id === id) || null;

export function saveProduct(data) {
  const db = load();
  if (data.id) {
    const i = db.products.findIndex((p) => p.id === data.id);
    if (i === -1) return null;
    db.products[i] = { ...db.products[i], ...data };
  } else {
    data.id = 'p' + String(Math.max(0, ...db.products.map((p) => parseInt(p.id.slice(1)))) + 1).padStart(3, '0');
    db.products.push(data);
  }
  persist();
  return data;
}

export function deleteProduct(id) {
  const db = load();
  db.products = db.products.filter((p) => p.id !== id);
  persist();
}

/* ── Orders ───────────────────────────────────────── */
function buildOrder(data, decrementStock = true) {
  const db = cache || load();
  const items = data.items.map((it) => {
    const p = db.products.find((pr) => pr.id === it.id);
    if (!p) throw new Error('Unknown product ' + it.id);
    const qty = Math.max(1, Math.min(99, parseInt(it.qty) || 1));
    if (decrementStock && p.stock < qty) throw new Error(`“${p.name}” is out of stock.`);
    return { productId: p.id, name: p.name, price: p.price, qty };
  });

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const deliveryFee = DELIVERY_OPTIONS[data.delivery]?.fee ?? 0;
  const seq = db.seq++;
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

export function createOrder(data) {
  const db = load();
  const order = buildOrder(data, true);
  // Decrement stock only after successful validation
  for (const it of order.items) {
    const p = db.products.find((pr) => pr.id === it.productId);
    p.stock -= it.qty;
  }
  db.orders.unshift(order);
  persist();
  return order;
}

export const listOrders = () => load().orders;
export const getOrder = (ref) => load().orders.find((o) => o.ref === ref) || null;

export function updateOrderStatus(ref, status) {
  const db = load();
  const o = db.orders.find((x) => x.ref === ref);
  if (o) { o.status = status; persist(); }
  return o;
}

/* ── Admin ────────────────────────────────────────── */
export function findAdmin(email) {
  return load().admins.find((a) => a.email.toLowerCase() === String(email).toLowerCase()) || null;
}

export function getKpis() {
  const db = load();
  const active = db.orders.filter((o) => o.status !== 'Cancelled');
  return {
    revenue: active.reduce((s, o) => s + o.total, 0),
    orders: db.orders.length,
    pending: db.orders.filter((o) => o.status === 'Pending').length,
    products: db.products.length,
    lowStock: db.products.filter((p) => p.stock < 10).length,
    units: db.products.reduce((s, p) => s + p.stock, 0),
  };
}
