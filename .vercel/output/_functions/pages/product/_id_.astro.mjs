import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../../chunks/StoreLayout_BCkAozPn.mjs';
import { $ as $$ProductCard } from '../../chunks/ProductCard_D2op6Qn2.mjs';
import { c as getProduct, a as getProducts } from '../../chunks/db_dt1ysPcI.mjs';
import { n as naira } from '../../chunks/format_CeNNESN9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const p = getProduct(id);
  if (!p) return Astro2.redirect("/");
  const related = getProducts({ category: p.category }).filter((x) => x.id !== p.id).slice(0, 4);
  const initials = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": `${p.name} \u2014 NovaMart Stores`, "description": p.blurb }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<nav style="margin: 1.5rem 0; font-size: 0.9rem; color: var(--ink-mute)" aria-label="Breadcrumb"> <a href="/">Home</a> / <a${addAttribute(`/?cat=${encodeURIComponent(p.category)}`, "href")}>${p.category}</a> /${" "} <span style="color: var(--ink)">${p.name}</span> </nav> <section style="display: grid; grid-template-columns: 1.05fr 1fr; gap: 2.5rem; margin-bottom: 3rem" class="pdp"> <div class="pdp__visual"${addAttribute(`background: linear-gradient(140deg, ${p.color}, #fff); border: 1px solid var(--line)`, "style")}> ${p.image ? renderTemplate`<img class="pdp__image"${addAttribute(p.image, "src")}${addAttribute(p.name, "alt")}>` : renderTemplate`<span style="font-size: 7rem; font-weight: 800; color: rgba(18,33,27,0.3); letter-spacing:-0.05em">${initials}</span>`} </div> <div style="display: flex; flex-direction: column; gap: 1rem; align-content: start"> <span class="chip is-active" style="align-self: flex-start">${p.category}</span> <h1 style="font-size: clamp(1.7rem, 3.5vw, 2.4rem); letter-spacing: -0.02em; line-height: 1.15">${p.name}</h1> <p style="color: var(--ink-soft); font-size: 1.05rem; max-width: 48ch">${p.blurb}</p> <p style="font-size: 2rem; font-weight: 800; color: var(--green-800)">${naira(p.price)}</p> <p${addAttribute(`font-weight: 700; color: ${p.stock === 0 ? "var(--red)" : p.stock < 10 ? "var(--amber-600)" : "var(--green-700)"}`, "style")}> ${p.stock === 0 ? "Currently sold out" : p.stock < 10 ? `Only ${p.stock} left in stock` : `In stock (${p.stock} available)`} </p> <div style="display: flex; gap: 0.9rem; align-items: center; margin-top: 0.5rem; flex-wrap: wrap"> <span class="qty-ctl"> <button type="button" onclick="const i=document.getElementById('pdp-qty');i.value=Math.max(1,+i.value-1)">−</button> <input id="pdp-qty" type="text" value="1" inputmode="numeric" aria-label="Quantity"> <button type="button" onclick="const i=document.getElementById('pdp-qty');i.value=Math.min(99,+i.value+1)">+</button> </span> <button class="btn btn--primary btn--lg"${addAttribute(p.id, "data-add-to-cart")}${addAttribute(p.stock === 0, "disabled")}>
Add to cart
</button> <a class="btn btn--ghost" href="/cart">Go to cart</a> </div> <div class="notice notice--info" style="margin-top: 0.75rem">
🚚 Free pickup in Kano · ₦1,500 Lagos &amp; Kano metro · ₦3,000 nationwide (2–5 days). Pay on
        delivery or by bank transfer.
</div> </div> </section> ${related.length > 0 && renderTemplate`<section aria-label="Related products" style="margin-bottom: 3rem"> <h2 style="margin-bottom: 1.25rem; letter-spacing: -0.01em">You may also like</h2> <div class="pgrid">${related.map((r) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "p": r })}`)}</div> </section>`}` })}`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/product/[id].astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/product/[id].astro";
const $$url = "/product/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
