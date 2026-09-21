import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute, p as renderScript } from '../../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../../chunks/StoreLayout_BCkAozPn.mjs';
import { b as getOrder, D as DELIVERY_OPTIONS } from '../../chunks/db_dt1ysPcI.mjs';
import { S as STATUS_COLORS, f as fmtDate, n as naira } from '../../chunks/format_CeNNESN9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$ref = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ref;
  const { ref } = Astro2.params;
  const order = getOrder(ref);
  if (!order) return Astro2.redirect("/");
  const isNew = Astro2.url.searchParams.get("new") === "1";
  const color = STATUS_COLORS[order.status] || "#555";
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": `Order ${order.ref} \u2014 NovaMart Stores` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="max-width: 760px; margin-inline: auto; padding: 2rem 0 3rem"> ${isNew && renderTemplate`<div class="notice notice--ok" style="font-size: 1rem; padding: 1.15rem 1.3rem">
🎉 <b>Order placed successfully!</b> Your reference is <b>${order.ref}</b>. We'll contact you
          on ${order.phone} to confirm.
</div>`} <div class="panel"> <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem"> <div> <h1 style="font-size: 1.5rem; letter-spacing: -0.01em">Order ${order.ref}</h1> <p style="color: var(--ink-mute); font-size: 0.9rem">${fmtDate(order.createdAt)}</p> </div> <span class="badge"${addAttribute(`background:${color}18; color:${color}`, "style")}>${order.status}</span> </div> <h2 style="margin-top: 1.25rem">Items</h2> <table class="tbl"> <thead> <tr><th>Product</th><th>Price</th><th>Qty</th><th class="num">Total</th></tr> </thead> <tbody> ${order.items.map((it) => renderTemplate`<tr> <td>${it.name}</td> <td>${naira(it.price)}</td> <td>${it.qty}</td> <td class="num">${naira(it.price * it.qty)}</td> </tr>`)} </tbody> </table> <div class="totals" style="max-width: 320px; margin-left: auto; margin-top: 1rem"> <div class="row"><span>Subtotal</span><span>${naira(order.subtotal)}</span></div> <div class="row"> <span>Delivery — ${DELIVERY_OPTIONS[order.delivery]?.label ?? order.delivery}</span> <span>${order.deliveryFee === 0 ? "Free" : naira(order.deliveryFee)}</span> </div> <div class="row grand"><span>Total</span><span>${naira(order.total)}</span></div> </div> <h2 style="margin-top: 1.75rem">Delivery details</h2> <p style="color: var(--ink-soft)"> <b>${order.customer}</b> · ${order.phone} ${order.email && ` \xB7 ${order.email}`}<br> ${order.address}, ${order.city}, ${order.state} </p> <div class="notice notice--info" style="margin-top: 1.5rem"> <b>What happens next:</b> we confirm your order → you pay on delivery or by bank transfer →
        your order ships. Track it anytime with reference <b>${order.ref}</b>.
</div> <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap"> <a href="/" class="btn btn--primary">Continue shopping</a> </div> </div> </div> ${isNew && renderTemplate`${renderScript($$result2, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/order/[ref].astro?astro&type=script&index=0&lang.ts")}`}` })}`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/order/[ref].astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/order/[ref].astro";
const $$url = "/order/[ref]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ref,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
