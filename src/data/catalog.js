/**
 * NovaMart seed catalog — FICTIONAL products & prices (₦) for the
 * concept demo. Replace with real inventory when a client adopts it.
 * Each product: { id, name, category, price (₦), stock, blurb, color }
 */
export const CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Groceries'];

export const PRODUCT_SEED = [
  // ── Electronics ──
  { id: 'p001', name: 'NaijaPods Pro Earbuds', category: 'Electronics', price: 28500, stock: 34, blurb: 'In-ear wireless earbuds with 30-hour total battery life, touch controls and deep bass tuned for Afrobeats.', color: '#dbeafe' },
  { id: 'p002', name: 'SwiftCharge 20000mAh Power Bank', category: 'Electronics', price: 24900, stock: 51, blurb: 'Dual USB-A + USB-C fast charging, LED display and enough juice for a full weekend of NEPA uncertainty.', color: '#e0e7ff' },
  { id: 'p003', name: 'Galaxy A15 Smartphone (128GB)', category: 'Electronics', price: 178000, stock: 9, blurb: '6.5" 90Hz display, 50MP camera and 5000mAh battery — the everyday workhorse.', color: '#dbeafe' },
  { id: 'p004', name: 'LumenDesk USB-C Laptop Stand', category: 'Electronics', price: 16750, stock: 22, blurb: 'Aluminium foldable stand that lifts your screen to eye level. Work-from-home posture, fixed.', color: '#ede9fe' },
  { id: 'p005', name: 'SoloBoom Mini Speaker', category: 'Electronics', price: 19200, stock: 17, blurb: 'Pocket-size Bluetooth speaker, 12h playtime, splash-proof. Small body, loud character.', color: '#e0e7ff' },
  // ── Fashion ──
  { id: 'p006', name: 'Ankara Canvas Tote Bag', category: 'Fashion', price: 9800, stock: 40, blurb: 'Hand-finished tote with vibrant Ankara panels and reinforced handles. Carries market runs and laptops alike.', color: '#fef3c7' },
  { id: 'p007', name: 'Lagos Runner Sneakers', category: 'Fashion', price: 32500, stock: 26, blurb: 'Lightweight knit sneakers with cushioned sole — built for Lekki-Ikoyi bridge walks and airport dashes.', color: '#dcfce7' },
  { id: 'p008', name: 'Adire Lounge Set (2-piece)', category: 'Fashion', price: 27900, stock: 13, blurb: 'Soft cotton two-piece in hand-dyed indigo Adire patterns. Comfort with culture.', color: '#e0f2fe' },
  { id: 'p009', name: 'Heritage Snapback Cap', category: 'Fashion', price: 7500, stock: 58, blurb: 'Structured 6-panel cap with embroidered crest. One size fits most.', color: '#fef9c3' },
  { id: 'p010', name: 'Kano Leather Wallet', category: 'Fashion', price: 11500, stock: 31, blurb: 'Full-grain leather bifold with RFID shielding, handmade in Kano.', color: '#fde68a' },
  // ── Home & Living ──
  { id: 'p011', name: 'TurboBlend Pro Blender 1.5L', category: 'Home & Living', price: 38900, stock: 15, blurb: '1200W motor crushes pepper, oats and frozen fruit in seconds. Includes dry-mill cup.', color: '#fee2e2' },
  { id: 'p012', name: 'Serenity Cotton Bedding Set', category: 'Home & Living', price: 41200, stock: 11, blurb: '400-thread-count duvet cover with 4 pillowcases. Hotel feel, home price.', color: '#fce7f3' },
  { id: 'p013', name: 'RapidHeat Electric Kettle 1.8L', category: 'Home & Living', price: 14500, stock: 28, blurb: 'Boils in under 3 minutes with auto shut-off and cool-touch body.', color: '#ffedd5' },
  { id: 'p014', name: 'Aria 4-Wick Scented Candle', category: 'Home & Living', price: 8900, stock: 44, blurb: 'Vanilla-amber scent, 45-hour burn. For evenings when the generator is off.', color: '#fdf4ff' },
  { id: 'p015', name: 'Stainless Cookware Set (7pc)', category: 'Home & Living', price: 64000, stock: 7, blurb: 'Induction-ready pots and pans with tempered glass lids. A kitchen starter kit that lasts.', color: '#fee2e2' },
  // ── Beauty ──
  { id: 'p016', name: 'Pure Shea Butter 500g', category: 'Beauty', price: 6200, stock: 63, blurb: 'Unrefined, grade-A shea from women cooperatives in Kwara. Skin and hair love it.', color: '#ecfccb' },
  { id: 'p017', name: 'Black Soap Care Set', category: 'Beauty', price: 9400, stock: 37, blurb: 'Traditional osun black soap + turmeric body oil + bamboo sponge kit.', color: '#d9f99d' },
  { id: 'p018', name: 'Glow Vit-C Serum 30ml', category: 'Beauty', price: 15800, stock: 21, blurb: '10% vitamin C with niacinamide for even tone and that Lagos-glow.', color: '#fef3c7' },
  // ── Groceries ──
  { id: 'p019', name: 'Ofada Rice — 5kg Bag', category: 'Groceries', price: 18700, stock: 48, blurb: 'Stone-free local Ofada rice, unpolished and aromatic. Ayamase approved.', color: '#ecfccb' },
  { id: 'p020', name: 'Cold-Pressed Palm Oil 2L', category: 'Groceries', price: 12300, stock: 33, blurb: 'Rich red oil from smallholder farms in Edo. No bleaching, no additives.', color: '#ffedd5' },
  { id: 'p021', name: 'Ijebu White Garri — 4kg', category: 'Groceries', price: 7800, stock: 52, blurb: 'Crisp, sour and properly fermented. Soak it or turn it — your call.', color: '#fef9c3' },
  { id: 'p022', name: 'Wild Forest Honey 750ml', category: 'Groceries', price: 10500, stock: 19, blurb: 'Raw, unfiltered honey from the Mambilla plateau. Thick and floral.', color: '#fef3c7' },
  { id: 'p023', name: 'Smoked Catfish — 4 Pieces', category: 'Groceries', price: 13900, stock: 12, blurb: 'Properly dried and smoked over hardwood. Pepper soup, sorted.', color: '#fee2e2' },
  { id: 'p024', name: 'Premium Thompson Egusi 1kg', category: 'Groceries', price: 9900, stock: 29, blurb: 'Ground egusi with high oil content for rich, mouldable soups.', color: '#d9f99d' },
];

/** Fictional demo orders so the admin panel has realistic content. */
export const ORDER_SEED = [
  { customer: 'Adaeze Okonkwo', phone: '+2348031234567', email: 'adaeze.o@example.com', address: '12 Admiralty Way, Lekki Phase 1', city: 'Lagos', state: 'Lagos', delivery: 'standard', status: 'Delivered', items: [{ id: 'p001', qty: 1 }, { id: 'p022', qty: 2 }] },
  { customer: 'Ibrahim Musa', phone: '+2348059876543', email: '', address: '44 Bompai Road, Nassarawa GRA', city: 'Kano', state: 'Kano', delivery: 'pickup', status: 'Shipped', items: [{ id: 'p010', qty: 1 }, { id: 'p023', qty: 1 }] },
  { customer: 'Chiamaka Eze', phone: '+2348123456789', email: 'c.eze@example.com', address: '8 Awolowo Road, Ikoyi', city: 'Lagos', state: 'Lagos', delivery: 'standard', status: 'Confirmed', items: [{ id: 'p008', qty: 2 }] },
  { customer: 'Tunde Bakare', phone: '+2349098765432', email: '', address: '21 Ring Road, Challenge', city: 'Ibadan', state: 'Oyo', delivery: 'nationwide', status: 'Pending', items: [{ id: 'p011', qty: 1 }, { id: 'p014', qty: 2 }, { id: 'p019', qty: 1 }] },
  { customer: 'Fatima Bello', phone: '+2347012345678', email: 'f.bello@example.com', address: '5 Sultan Road, Kaduna North', city: 'Kaduna', state: 'Kaduna', delivery: 'nationwide', status: 'Pending', items: [{ id: 'p016', qty: 3 }] },
];

export const DELIVERY_OPTIONS = {
  pickup: { label: 'Store pickup (Kano)', fee: 0 },
  standard: { label: 'Standard delivery — Lagos & Kano metro', fee: 1500 },
  nationwide: { label: 'Nationwide delivery — 2–5 days', fee: 3000 },
};

export const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta',
  'Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina',
  'Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers',
  'Sokoto','Taraba','Yobe','Zamfara',
];
