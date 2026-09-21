import { e as createComponent, m as maybeRenderHead, g as addAttribute, k as renderComponent, n as Fragment, r as renderTemplate, h as createAstro, u as unescapeHTML } from './astro/server_BHx4noih.mjs';
import 'piccolore';
import { n as naira } from './format_CeNNESN9.mjs';

const $$Astro = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { p } = Astro2.props;
  const initials = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const stockBadge = p.stock === 0 ? '<span class="pcard__stock out">Sold out</span>' : p.stock < 10 ? `<span class="pcard__stock low">Only ${p.stock} left</span>` : '<span class="pcard__stock">In stock</span>';
  return renderTemplate`${maybeRenderHead()}<article class="pcard"> <a${addAttribute(`/product/${p.id}`, "href")} class="pcard__tile"${addAttribute(`background: linear-gradient(140deg, ${p.color}, #fff)`, "style")}${addAttribute(p.name, "aria-label")}> <span class="pcard__cat">${p.category}</span> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(stockBadge)}` })} ${p.image ? renderTemplate`<img class="pcard__image"${addAttribute(p.image, "src")}${addAttribute(p.name, "alt")}>` : renderTemplate`<span class="pcard__letter" aria-hidden="true">${initials}</span>`} </a> <div class="pcard__body"> <h3 class="pcard__name"><a${addAttribute(`/product/${p.id}`, "href")}>${p.name}</a></h3> <div class="row"> <span class="pcard__price">${naira(p.price)}</span> <button class="btn btn--primary btn--sm"${addAttribute(p.id, "data-add-to-cart")}${addAttribute(p.stock === 0, "disabled")}${addAttribute(`Add ${p.name} to cart`, "aria-label")}>
Add
</button> </div> </div> </article>`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/components/ProductCard.astro", void 0);

export { $$ProductCard as $ };
