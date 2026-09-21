import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, g as addAttribute, n as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Yfpc_MDA.mjs';
import { a as getProducts, C as CATEGORIES } from '../../chunks/db_CyJmpg4P.mjs';
import { n as naira } from '../../chunks/format_CeNNESN9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const q = Astro2.url.searchParams.get("q") ?? "";
  const cat = Astro2.url.searchParams.get("cat") ?? "";
  const products = getProducts({ q, category: cat, sort: "name" });
  const saved = Astro2.url.searchParams.get("saved");
  const deleted = Astro2.url.searchParams.get("deleted");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Products", "subtitle": `${products.length} product${products.length === 1 ? "" : "s"} in catalog`, "active": "products" }, { "actions": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "actions" }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<a href="/admin/products/new" class="btn btn--primary">+ New product</a> ` })}`, "default": ($$result2) => renderTemplate`  ${saved && renderTemplate`<div class="notice notice--ok">Product saved successfully. ✅</div>`}${deleted && renderTemplate`<div class="notice notice--info">Product removed from catalog.</div>`}<form method="get" class="chip-bar" style="margin-top: 0"> <input type="search" name="q"${addAttribute(q, "value")} placeholder="Search…" style="border: 1.5px solid var(--line-strong); border-radius: 999px; padding: 0.55rem 1.1rem; min-width: 210px"> <a${addAttribute(`chip ${!cat ? "is-active" : ""}`, "class")} href="/admin/products">All</a> ${CATEGORIES.map((c) => renderTemplate`<a${addAttribute(`chip ${cat === c ? "is-active" : ""}`, "class")}${addAttribute(`/admin/products?cat=${encodeURIComponent(c)}`, "href")}>${c}</a>`)} <noscript><button class="btn btn--ghost btn--sm">Filter</button></noscript> </form> <div class="panel" style="padding: 0.5rem 1.25rem"> <table class="tbl"> <thead> <tr><th>Product</th><th>Category</th><th class="num">Price</th><th class="num">Stock</th><th></th></tr> </thead> <tbody> ${products.map((p) => renderTemplate`<tr> <td> <div style="display:flex; gap:0.7rem; align-items:center"> <span class="avatar-tile"${addAttribute(`background:${p.color}`, "style")}>${p.name[0]}</span> <span> <b>${p.name}</b><br> <span style="color:var(--ink-mute); font-size:0.82rem">${p.id}</span> </span> </div> </td> <td style="color:var(--ink-soft)">${p.category}</td> <td class="num"><b>${naira(p.price)}</b></td> <td class="num"> <span class="badge"${addAttribute(`background:${p.stock === 0 ? "#b91c1c18" : p.stock < 10 ? "#d9770618" : "#15803d18"}; color:${p.stock === 0 ? "#b91c1c" : p.stock < 10 ? "#d97706" : "#15803d"}`, "style")}> ${p.stock} </span> </td> <td class="num" style="white-space: nowrap"> <a${addAttribute(`/admin/products/${p.id}`, "href")} class="btn btn--ghost btn--sm">Edit</a>${" "} <form method="POST"${addAttribute(`/api/admin/product-delete?id=${p.id}`, "action")} style="display:inline" onsubmit="return confirm('Delete this product?')"> <button class="btn btn--danger btn--sm">Delete</button> </form> </td> </tr>`)} </tbody> </table> </div> ` })}`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/products/index.astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/products/index.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
