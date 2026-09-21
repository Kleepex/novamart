import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_Yfpc_MDA.mjs';
import { g as getKpis, l as listOrders, a as getProducts } from '../chunks/db_dt1ysPcI.mjs';
import { n as naira, S as STATUS_COLORS, f as fmtDate } from '../chunks/format_CeNNESN9.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const k = getKpis();
  const recent = listOrders().slice(0, 6);
  const lowStock = getProducts({ sort: "stock" }).filter((p) => p.stock < 10);
  const kpis = [
    { label: "Revenue (\u20A6)", value: naira(k.revenue), sub: "All non-cancelled orders" },
    { label: "Orders", value: String(k.orders), sub: `${k.pending} awaiting confirmation` },
    { label: "Products", value: String(k.products), sub: `${k.units} units in stock` },
    { label: "Low stock", value: String(k.lowStock), sub: "Below 10 units" }
  ];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "subtitle": "NovaMart at a glance \u2014 live store data", "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="kpis" data-astro-cid-u2h3djql> ${kpis.map((x) => renderTemplate`<div class="kpi" data-astro-cid-u2h3djql> <div class="label" data-astro-cid-u2h3djql>${x.label}</div> <div class="value" data-astro-cid-u2h3djql>${x.value}</div> <div class="sub" data-astro-cid-u2h3djql>${x.sub}</div> </div>`)} </div> <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.25rem; align-items: start" class="dash-grid" data-astro-cid-u2h3djql> <div class="panel" style="padding: 1rem 1.25rem" data-astro-cid-u2h3djql> <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 0.5rem" data-astro-cid-u2h3djql> <h2 style="margin:0" data-astro-cid-u2h3djql>Latest orders</h2> <a href="/admin/orders" style="font-weight: 600; font-size: 0.9rem" data-astro-cid-u2h3djql>View all →</a> </div> <table class="tbl" data-astro-cid-u2h3djql> <thead data-astro-cid-u2h3djql> <tr data-astro-cid-u2h3djql><th data-astro-cid-u2h3djql>Ref</th><th data-astro-cid-u2h3djql>Customer</th><th class="num" data-astro-cid-u2h3djql>Total</th><th data-astro-cid-u2h3djql>Status</th><th data-astro-cid-u2h3djql>Placed</th></tr> </thead> <tbody data-astro-cid-u2h3djql> ${recent.map((o) => renderTemplate`<tr data-astro-cid-u2h3djql> <td data-astro-cid-u2h3djql><a${addAttribute(`/admin/orders/${o.ref}`, "href")} style="font-weight:700" data-astro-cid-u2h3djql>${o.ref}</a></td> <td data-astro-cid-u2h3djql>${o.customer}<br data-astro-cid-u2h3djql><span style="color:var(--ink-mute);font-size:0.84rem" data-astro-cid-u2h3djql>${o.city}, ${o.state}</span></td> <td class="num" data-astro-cid-u2h3djql><b data-astro-cid-u2h3djql>${naira(o.total)}</b></td> <td data-astro-cid-u2h3djql><span class="badge"${addAttribute(`background:${STATUS_COLORS[o.status]}18;color:${STATUS_COLORS[o.status]}`, "style")} data-astro-cid-u2h3djql>${o.status}</span></td> <td style="color:var(--ink-mute);font-size:0.85rem" data-astro-cid-u2h3djql>${fmtDate(o.createdAt)}</td> </tr>`)} </tbody> </table> </div> <div class="panel" data-astro-cid-u2h3djql> <h2 data-astro-cid-u2h3djql>Stock alerts</h2> ${lowStock.length === 0 ? renderTemplate`<p style="color: var(--ink-mute)" data-astro-cid-u2h3djql>All products are well stocked. ✅</p>` : renderTemplate`<table class="tbl" style="font-size: 0.9rem" data-astro-cid-u2h3djql> <tbody data-astro-cid-u2h3djql> ${lowStock.slice(0, 6).map((p) => renderTemplate`<tr data-astro-cid-u2h3djql> <td data-astro-cid-u2h3djql> <div style="display:flex; gap:0.6rem; align-items:center" data-astro-cid-u2h3djql> <span class="avatar-tile"${addAttribute(`background:${p.color}`, "style")} data-astro-cid-u2h3djql>${p.name[0]}</span> <a${addAttribute(`/admin/products/${p.id}`, "href")} style="font-weight:600" data-astro-cid-u2h3djql>${p.name}</a> </div> </td> <td class="num" data-astro-cid-u2h3djql> <span class="badge"${addAttribute(`background:${p.stock === 0 ? "#b91c1c18" : "#d9770618"}; color:${p.stock === 0 ? "#b91c1c" : "#d97706"}`, "style")} data-astro-cid-u2h3djql> ${p.stock} left
</span> </td> </tr>`)} </tbody> </table>`} </div> </div> ` })} `;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
