import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, n as Fragment, u as unescapeHTML, g as addAttribute } from '../../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Yfpc_MDA.mjs';
import { l as listOrders } from '../../chunks/db_dt1ysPcI.mjs';
import { O as ORDER_STATUSES, n as naira, S as STATUS_COLORS, f as fmtDate } from '../../chunks/format_CeNNESN9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const status = Astro2.url.searchParams.get("status") ?? "";
  const saved = Astro2.url.searchParams.get("saved");
  const orders = listOrders().filter((o) => !status || o.status === status);
  const chip = (label, value) => `<a class="chip ${status === value ? "is-active" : ""}" href="/admin/orders${value ? "?status=" + value : ""}">${label}</a>`;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Orders", "subtitle": `${orders.length} order${orders.length === 1 ? "" : "s"}${status ? " \u2014 " + status : ""}`, "active": "orders" }, { "default": ($$result2) => renderTemplate`${saved && renderTemplate`${maybeRenderHead()}<div class="notice notice--ok">Order status updated. ✅</div>`}<div class="chip-bar" style="margin-top:0"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(chip("All", ""))}` })} ${ORDER_STATUSES.map((s) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(chip(s, s))}` })}`)} </div> <div class="panel" style="padding: 0.5rem 1.25rem"> ${orders.length === 0 ? renderTemplate`<div class="empty"> <div class="big">📦</div> <h2>No orders here yet</h2> <p>New orders from the storefront will appear here.</p> </div>` : renderTemplate`<table class="tbl"> <thead> <tr><th>Ref</th><th>Customer</th><th>Items</th><th class="num">Total</th><th>Status</th><th>Placed</th><th></th></tr> </thead> <tbody> ${orders.map((o) => renderTemplate`<tr> <td><a${addAttribute(`/admin/orders/${o.ref}`, "href")} style="font-weight:700">${o.ref}</a></td> <td>${o.customer}<br><span style="color:var(--ink-mute);font-size:0.84rem">${o.phone}</span></td> <td style="color:var(--ink-soft)">${o.items.reduce((s, i) => s + i.qty, 0)}</td> <td class="num"><b>${naira(o.total)}</b></td> <td><span class="badge"${addAttribute(`background:${STATUS_COLORS[o.status]}18;color:${STATUS_COLORS[o.status]}`, "style")}>${o.status}</span></td> <td style="color:var(--ink-mute);font-size:0.85rem">${fmtDate(o.createdAt)}</td> <td class="num"><a${addAttribute(`/admin/orders/${o.ref}`, "href")} class="btn btn--ghost btn--sm">View</a></td> </tr>`)} </tbody> </table>`} </div> ` })}`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/orders/index.astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/orders/index.astro";
const $$url = "/admin/orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
