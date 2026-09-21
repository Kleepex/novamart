import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, n as Fragment, u as unescapeHTML } from '../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_BCkAozPn.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_D2op6Qn2.mjs';
import { a as getProducts, C as CATEGORIES } from '../chunks/db_dt1ysPcI.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const q = Astro2.url.searchParams.get("q") ?? "";
  const cat = Astro2.url.searchParams.get("cat") ?? "";
  const sort = Astro2.url.searchParams.get("sort") ?? "featured";
  const products = getProducts({ q, category: cat, sort });
  const chip = (label, value) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (value) params.set("cat", value);
    if (sort !== "featured") params.set("sort", sort);
    const qs = params.toString();
    return `<a class="chip ${cat === value ? "is-active" : ""}" href="/${qs ? "?" + qs : ""}">${label}</a>`;
  };
  const sortLink = (value, label) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("cat", cat);
    if (value !== "featured") params.set("sort", value);
    return `<a class="chip ${sort === value ? "is-active" : ""}" href="/?${params}">${label}</a>`;
  };
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="store-hero"> <span class="pill">Free pickup in Kano · Nationwide delivery</span> <h1>Everyday essentials your household actually needs — delivered.</h1> <p>
Electronics, fashion, home &amp; living, beauty and groceries — curated for Nigerian homes and
      priced in naira with fast local delivery and everyday essentials you can trust.
</p> </section> ${q && renderTemplate`<p style="margin: 1.25rem 0 0; color: var(--ink-soft)"> ${products.length} result${products.length === 1 ? "" : "s"} for <b>“${q}”</b>${" "} <a href="/" style="font-weight: 600">Clear search</a> </p>`}<div class="chip-bar" aria-label="Filter by category"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(chip("All products", ""))}` })} ${CATEGORIES.map((c) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(chip(c, c))}` })}`)} <span style="flex: 1"></span> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(sortLink("featured", "Featured"))}` })} ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(sortLink("price-asc", "\u20A6 Low \u2192 High"))}` })} ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(sortLink("price-desc", "\u20A6 High \u2192 Low"))}` })} ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(sortLink("name", "A\u2013Z"))}` })} </div> ${products.length === 0 ? renderTemplate`<div class="empty panel"> <div class="big">🛍️</div> <h2>No products found</h2> <p>Try a different search term or category.</p> </div>` : renderTemplate`<section class="pgrid" aria-label="Products"> ${products.map((p) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "p": p })}`)} </section>`}` })}`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/index.astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
