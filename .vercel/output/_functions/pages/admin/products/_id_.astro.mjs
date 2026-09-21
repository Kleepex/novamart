import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_Yfpc_MDA.mjs';
import { c as getProduct, C as CATEGORIES } from '../../../chunks/db_CyJmpg4P.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const isNew = id === "new";
  const p = isNew ? { id: "", name: "", category: CATEGORIES[0], price: 0, stock: 0, blurb: "", color: "#dbeafe" } : getProduct(id);
  if (!p) return Astro2.redirect("/admin/products");
  const TILE_COLORS = ["#dbeafe", "#e0e7ff", "#ede9fe", "#fef3c7", "#dcfce7", "#e0f2fe", "#fee2e2", "#fce7f3", "#ffedd5", "#ecfccb", "#d9f99d", "#fdf4ff"];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": isNew ? "New product" : `Edit \u2014 ${p.name}`, "subtitle": isNew ? "Add a product to the catalog" : p.id, "active": "products" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<form method="POST" action="/api/admin/product-save" style="max-width: 720px"> <input type="hidden" name="id"${addAttribute(p.id, "value")}> <div class="panel"> <div class="fgrid"> <div class="field full"> <label for="f-name">Product name *</label> <input id="f-name" name="name" required${addAttribute(p.name, "value")} placeholder="e.g. NaijaPods Pro Earbuds"> </div> <div class="field"> <label for="f-cat">Category *</label> <select id="f-cat" name="category"> ${CATEGORIES.map((c) => renderTemplate`<option${addAttribute(c, "value")}${addAttribute(p.category === c, "selected")}>${c}</option>`)} </select> </div> <div class="field"> <label for="f-color">Tile colour</label> <select id="f-color" name="color"> ${TILE_COLORS.map((c) => renderTemplate`<option${addAttribute(c, "value")}${addAttribute(p.color === c, "selected")}>${c}</option>`)} </select> <span class="hint">Pastel background used on the product tile.</span> </div> <div class="field"> <label for="f-price">Price (₦) *</label> <input id="f-price" name="price" type="number" min="0" step="50" required${addAttribute(p.price, "value")}> </div> <div class="field"> <label for="f-stock">Stock *</label> <input id="f-stock" name="stock" type="number" min="0" required${addAttribute(p.stock, "value")}> </div> <div class="field full"> <label for="f-blurb">Description *</label> <textarea id="f-blurb" name="blurb" required placeholder="One or two sentences that sell the product.">${p.blurb}</textarea> </div> </div> <div style="display:flex; gap:0.75rem; margin-top: 1.4rem; flex-wrap: wrap"> <button class="btn btn--primary" type="submit">${isNew ? "Create product" : "Save changes"}</button> <a href="/admin/products" class="btn btn--ghost">Cancel</a> </div> </div> </form> ` })}`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/products/[id].astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/products/[id].astro";
const $$url = "/admin/products/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
