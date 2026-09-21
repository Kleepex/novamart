import { e as createComponent, g as addAttribute, p as renderScript, l as renderHead, o as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_BHx4noih.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$StoreLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$StoreLayout;
  const {
    title = "NovaMart Stores \u2014 Everyday essentials, delivered across Nigeria",
    description = "Shop electronics, fashion, home essentials, beauty and groceries with nationwide delivery across Nigeria."
  } = Astro2.props;
  const q = Astro2.url.searchParams.get("q") ?? "";
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="robots" content="noindex"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='12' fill='%230b3d2e'/%3E%3Ctext x='24' y='33' font-family='Arial' font-weight='bold' font-size='24' fill='white' text-anchor='middle'%3EN%3C/text%3E%3C/svg%3E"><!-- Shared cart store (localStorage {nm_cart: {productId: qty}}).
         Lives in <head> so this module runs BEFORE page-level modules
         that depend on window.NMCart. -->${renderScript($$result, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/layouts/StoreLayout.astro?astro&type=script&index=0&lang.ts")}${renderHead()}</head> <body> <header class="store-header"> <div class="container store-header__in"> <a href="/" class="brand" aria-label="NovaMart Stores — home"> <span class="brand__mark">N</span> <span>
NovaMart
<small>Nigeria's store</small> </span> </a> <form class="search-wrap" action="/" method="get" role="search"> <input type="search" name="q"${addAttribute(q, "value")} placeholder="Search products — e.g. power bank, ofada rice…" aria-label="Search products"> <button class="btn btn--primary btn--sm" type="submit">Search</button> </form> <a href="/cart" class="cart-btn" aria-label="View cart"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"></circle><circle cx="17" cy="20" r="1.4"></circle><path d="M3 3h2l2.5 12.3a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.2L20 7H6"></path></svg> <span class="lbl">Cart</span> <span class="cart-count" id="cart-count">0</span> </a> </div> </header> <main class="container"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="store-footer"> <div class="container row"> <span>© 2026 NovaMart Stores.</span> <span>Designed &amp; engineered by <a href="https://www.kleepex.com.ng"><b>Kleepex</b></a></span> </div> </footer> <div id="toast" role="status" aria-live="polite"></div> </body></html>`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/layouts/StoreLayout.astro", void 0);

export { $$StoreLayout as $ };
