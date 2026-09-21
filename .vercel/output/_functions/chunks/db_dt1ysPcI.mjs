import { existsSync, readFileSync, mkdirSync, writeFileSync, renameSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * NovaMart seed catalog — market-priced Nigerian product inventory.
 * Prices are approximate retail ranges commonly seen in Nigeria for 2025.
 * Each product includes an image URL for a lifestyle product shot.
 */
const CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Groceries'];

const PRODUCT_SEED = [
  // ── Electronics ──
  { id: 'p001', name: 'Oraimo 20000mAh Power Bank', category: 'Electronics', price: 26500, stock: 34, blurb: 'Fast-charge portable battery for phones, tablets and USB accessories with a compact body that fits naturally into a work bag.', color: '#dbeafe', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p002', name: 'JBL Clip 4 Bluetooth Speaker', category: 'Electronics', price: 44000, stock: 21, blurb: 'Portable speaker with punchy sound, rugged body and deep bass for rooms, patios, trips and weekend hangouts.', color: '#e0e7ff', image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p003', name: 'Samsung Galaxy A15 128GB', category: 'Electronics', price: 185000, stock: 9, blurb: 'Reliable Android smartphone with a bright display, solid camera performance and enough battery life for daily business and social use.', color: '#dbeafe', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p004', name: 'Anker 7-in-1 USB-C Hub', category: 'Electronics', price: 38500, stock: 18, blurb: 'Compact docking station for laptops, monitors and peripherals that gives a cleaner desk setup for home offices in Lagos and Abuja.', color: '#ede9fe', image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p005', name: 'Logitech H111 Wired Headset', category: 'Electronics', price: 11500, stock: 26, blurb: 'Everyday headset for calls, lessons and online work with a comfortable over-ear fit and clear voice pickup.', color: '#e0e7ff', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80' },
  // ── Fashion ──
  { id: 'p006', name: 'Adidas Superstar Sneakers', category: 'Fashion', price: 72000, stock: 14, blurb: 'Iconic streetwear sneaker with clean lines and reliable cushioning for everyday walking, errands and weekend dressing.', color: '#fef3c7', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p007', name: 'Ankara Print Tote Bag', category: 'Fashion', price: 12000, stock: 40, blurb: 'Bold Nigerian print tote that carries market essentials, books and work gear without losing its vibrant personality.', color: '#dcfce7', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p008', name: 'Classic Men’s Polo Shirt', category: 'Fashion', price: 16500, stock: 29, blurb: 'Smart casual polo designed for meetings, quick errands and relaxed evenings out with a refined everyday fit.', color: '#e0f2fe', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p009', name: 'Leather Dress Belt', category: 'Fashion', price: 8500, stock: 35, blurb: 'Premium everyday belt with a polished finish that elevates smart casual looks and formal outfits.', color: '#fef9c3', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p010', name: 'Women’s Leather Handbag', category: 'Fashion', price: 18500, stock: 22, blurb: 'Structured everyday handbag with enough space for essentials, a phone, wallet and small work items.', color: '#fde68a', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80' },
  // ── Home & Living ──
  { id: 'p011', name: 'Haier Thermocool Blender', category: 'Home & Living', price: 48000, stock: 15, blurb: 'Quality blender for soups, smoothies and pepper ingredients with a strong motor and durable jar for home kitchens.', color: '#fee2e2', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p012', name: 'Prestige Electric Kettle', category: 'Home & Living', price: 16000, stock: 28, blurb: 'Quick-boil kettle built for tea, oats and morning routine, with an easy-grip body and compact footprint.', color: '#fce7f3', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p013', name: 'Safety Ironing Board Set', category: 'Home & Living', price: 14000, stock: 24, blurb: 'Stable ironing setup for clothes, uniforms and household linen, designed for easy storage and reliable daily use.', color: '#ffedd5', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p014', name: 'Luxury Scented Candle', category: 'Home & Living', price: 9200, stock: 44, blurb: 'Warm fragrance candle that creates a calming mood in bedrooms, living rooms and cozy evening corners.', color: '#fdf4ff', image: 'https://images.unsplash.com/photo-1602872029706-8d7d5d4a31a7?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p015', name: '7-Piece Stainless Cookware Set', category: 'Home & Living', price: 64000, stock: 7, blurb: 'Everyday cookware bundle that covers boiling, frying and simmering with durable stainless steel construction.', color: '#fee2e2', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80' },
  // ── Beauty ──
  { id: 'p016', name: 'Pure Shea Butter 500g', category: 'Beauty', price: 6200, stock: 63, blurb: 'Rich unrefined shea butter for hydration, hair care and daily skin nourishment inspired by traditional Nigerian beauty rituals.', color: '#ecfccb', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p017', name: 'Dove Body Lotion', category: 'Beauty', price: 9500, stock: 37, blurb: 'Lightweight body care lotion that keeps skin moisturized from morning routine through dry afternoon weather.', color: '#d9f99d', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p018', name: 'Nivea Men’s Face Wash', category: 'Beauty', price: 7800, stock: 41, blurb: 'Daily cleanser for active routines, helping remove oil and refresh skin before work, commuting or evening plans.', color: '#fef3c7', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80' },
  // ── Groceries ──
  { id: 'p019', name: 'Golden Penny Rice 5kg', category: 'Groceries', price: 18700, stock: 48, blurb: 'Household rice staple with reliable taste and texture for family meals, soups and quick everyday cooking.', color: '#ecfccb', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p020', name: 'Pride Palm Oil 5L', category: 'Groceries', price: 12300, stock: 33, blurb: 'Kitchen staple for stews, soups and traditional meals, loved for rich texture and familiar flavour in Nigerian homes.', color: '#ffedd5', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p021', name: 'Ijebu Garri 4kg', category: 'Groceries', price: 7800, stock: 52, blurb: 'Popular cassava staple for soaking, swallowing and quick family meals with that classic cottage-to-table taste.', color: '#fef9c3', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p022', name: 'Pure Natural Honey 750ml', category: 'Groceries', price: 10500, stock: 19, blurb: 'Natural honey used for breakfast, drinks and wellness routines with a smooth flavour profile and healthy appeal.', color: '#fef3c7', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p023', name: 'Fresh Catfish 1kg', category: 'Groceries', price: 13900, stock: 12, blurb: 'Fresh seafood staple for soups, grills and traditional pepper soup preparation with a trusted market supply profile.', color: '#fee2e2', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80' },
  { id: 'p024', name: 'Premium Egusi Seed 1kg', category: 'Groceries', price: 9900, stock: 29, blurb: 'A key soup ingredient for rich soups and stews, popular in homes where traditional flavours take centre stage.', color: '#d9f99d', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80' },
];

/** Fictional demo orders so the admin panel has realistic content. */
const ORDER_SEED = [
  { customer: 'Adaeze Okonkwo', phone: '+2348031234567', email: 'adaeze.o@example.com', address: '12 Admiralty Way, Lekki Phase 1', city: 'Lagos', state: 'Lagos', delivery: 'standard', status: 'Delivered', items: [{ id: 'p001', qty: 1 }, { id: 'p022', qty: 2 }] },
  { customer: 'Ibrahim Musa', phone: '+2348059876543', email: '', address: '44 Bompai Road, Nassarawa GRA', city: 'Kano', state: 'Kano', delivery: 'pickup', status: 'Shipped', items: [{ id: 'p010', qty: 1 }, { id: 'p023', qty: 1 }] },
  { customer: 'Chiamaka Eze', phone: '+2348123456789', email: 'c.eze@example.com', address: '8 Awolowo Road, Ikoyi', city: 'Lagos', state: 'Lagos', delivery: 'standard', status: 'Confirmed', items: [{ id: 'p008', qty: 2 }] },
  { customer: 'Tunde Bakare', phone: '+2349098765432', email: '', address: '21 Ring Road, Challenge', city: 'Ibadan', state: 'Oyo', delivery: 'nationwide', status: 'Pending', items: [{ id: 'p011', qty: 1 }, { id: 'p014', qty: 2 }, { id: 'p019', qty: 1 }] },
  { customer: 'Fatima Bello', phone: '+2347012345678', email: 'f.bello@example.com', address: '5 Sultan Road, Kaduna North', city: 'Kaduna', state: 'Kaduna', delivery: 'nationwide', status: 'Pending', items: [{ id: 'p016', qty: 3 }] },
];

const DELIVERY_OPTIONS = {
  pickup: { label: 'Store pickup (Kano)', fee: 0 },
  standard: { label: 'Standard delivery — Lagos & Kano metro', fee: 1500 },
  nationwide: { label: 'Nationwide delivery — 2–5 days', fee: 3000 },
};

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta',
  'Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina',
  'Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers',
  'Sokoto','Taraba','Yobe','Zamfara',
];

/**
 * NovaMart data layer — embedded JSON-file database.
 * ─────────────────────────────────────────────────
 * Structured so the storage engine can be swapped for SQLite,
 * Turso or Postgres later without touching page code:
 * every page calls these functions, never the file directly.
 */

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
function getProducts({ q = '', category = '', sort = 'featured' } = {}) {
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

const getProduct = (id) => load().products.find((p) => p.id === id) || null;

function saveProduct(data) {
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

function deleteProduct(id) {
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

function createOrder(data) {
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

const listOrders = () => load().orders;
const getOrder = (ref) => load().orders.find((o) => o.ref === ref) || null;

function updateOrderStatus(ref, status) {
  const db = load();
  const o = db.orders.find((x) => x.ref === ref);
  if (o) { o.status = status; persist(); }
  return o;
}

/* ── Admin ────────────────────────────────────────── */
function findAdmin(email) {
  return load().admins.find((a) => a.email.toLowerCase() === String(email).toLowerCase()) || null;
}

function getKpis() {
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

export { CATEGORIES as C, DELIVERY_OPTIONS as D, NIGERIAN_STATES as N, getProducts as a, getOrder as b, getProduct as c, deleteProduct as d, createOrder as e, findAdmin as f, getKpis as g, listOrders as l, saveProduct as s, updateOrderStatus as u };
