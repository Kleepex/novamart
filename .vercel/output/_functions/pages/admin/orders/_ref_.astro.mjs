import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, n as Fragment, g as addAttribute } from '../../../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_Yfpc_MDA.mjs';
import { b as getOrder, D as DELIVERY_OPTIONS } from '../../../chunks/db_dt1ysPcI.mjs';
import { f as fmtDate, n as naira, S as STATUS_COLORS, O as ORDER_STATUSES } from '../../../chunks/format_CeNNESN9.mjs';
/* empty css                                       */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$ref = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ref;
  const { ref } = Astro2.params;
  const o = getOrder(ref);
  if (!o) return Astro2.redirect("/admin/orders");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Order ${o.ref}`, "subtitle": `Placed ${fmtDate(o.createdAt)}`, "active": "orders", "data-astro-cid-bo2jd5xw": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display:grid; grid-template-columns: 1.5fr 1fr; gap: 1.25rem; align-items: start" class="ord-grid" data-astro-cid-bo2jd5xw> <div class="panel" style="padding: 1rem 1.25rem" data-astro-cid-bo2jd5xw> <h2 data-astro-cid-bo2jd5xw>Items</h2> <table class="tbl" data-astro-cid-bo2jd5xw> <thead data-astro-cid-bo2jd5xw><tr data-astro-cid-bo2jd5xw><th data-astro-cid-bo2jd5xw>Product</th><th data-astro-cid-bo2jd5xw>Price</th><th data-astro-cid-bo2jd5xw>Qty</th><th class="num" data-astro-cid-bo2jd5xw>Total</th></tr></thead> <tbody data-astro-cid-bo2jd5xw> ${o.items.map((it) => renderTemplate`<tr data-astro-cid-bo2jd5xw> <td data-astro-cid-bo2jd5xw>${it.name}</td> <td data-astro-cid-bo2jd5xw>${naira(it.price)}</td> <td data-astro-cid-bo2jd5xw>${it.qty}</td> <td class="num" data-astro-cid-bo2jd5xw>${naira(it.price * it.qty)}</td> </tr>`)} </tbody> </table> <div class="totals" style="max-width: 300px; margin-left: auto; margin-top: 1rem" data-astro-cid-bo2jd5xw> <div class="row" data-astro-cid-bo2jd5xw><span data-astro-cid-bo2jd5xw>Subtotal</span><span data-astro-cid-bo2jd5xw>${naira(o.subtotal)}</span></div> <div class="row" data-astro-cid-bo2jd5xw><span data-astro-cid-bo2jd5xw>Delivery</span><span data-astro-cid-bo2jd5xw>${o.deliveryFee === 0 ? "Free" : naira(o.deliveryFee)}</span></div> <div class="row grand" data-astro-cid-bo2jd5xw><span data-astro-cid-bo2jd5xw>Total</span><span data-astro-cid-bo2jd5xw>${naira(o.total)}</span></div> </div> </div> <div style="display:grid; gap:1.25rem" data-astro-cid-bo2jd5xw> <div class="panel" data-astro-cid-bo2jd5xw> <h2 data-astro-cid-bo2jd5xw>Customer</h2> <p style="color: var(--ink-soft)" data-astro-cid-bo2jd5xw> <b data-astro-cid-bo2jd5xw>${o.customer}</b><br data-astro-cid-bo2jd5xw> ${o.phone}${o.email && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-bo2jd5xw": true }, { "default": ($$result3) => renderTemplate` · ${o.email}` })}`}<br data-astro-cid-bo2jd5xw> ${o.address}, ${o.city}, ${o.state}<br data-astro-cid-bo2jd5xw> <span style="font-size: 0.88rem; color: var(--ink-mute)" data-astro-cid-bo2jd5xw>
📦 ${DELIVERY_OPTIONS[o.delivery]?.label ?? o.delivery} </span> </p> </div> <div class="panel" data-astro-cid-bo2jd5xw> <h2 data-astro-cid-bo2jd5xw>Status</h2> <p style="margin-bottom: 0.8rem" data-astro-cid-bo2jd5xw> <span class="badge"${addAttribute(`background:${STATUS_COLORS[o.status]}18;color:${STATUS_COLORS[o.status]}`, "style")} data-astro-cid-bo2jd5xw>${o.status}</span> </p> <form method="POST"${addAttribute(`/api/admin/order-status?ref=${o.ref}`, "action")} style="display:flex; gap:0.6rem; flex-wrap:wrap" data-astro-cid-bo2jd5xw> <select name="status" style="flex:1; min-width: 140px; border:1.5px solid var(--line-strong); border-radius:10px; padding:0.6rem 0.8rem" data-astro-cid-bo2jd5xw> ${ORDER_STATUSES.map((s) => renderTemplate`<option${addAttribute(s, "value")}${addAttribute(o.status === s, "selected")} data-astro-cid-bo2jd5xw>${s}</option>`)} </select> <button class="btn btn--primary btn--sm" type="submit" data-astro-cid-bo2jd5xw>Update</button> </form> </div> </div> </div> ` })} `;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/orders/[ref].astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/orders/[ref].astro";
const $$url = "/admin/orders/[ref]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ref,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
