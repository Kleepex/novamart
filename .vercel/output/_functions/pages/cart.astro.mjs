import { e as createComponent, k as renderComponent, r as renderTemplate, p as renderScript, u as unescapeHTML, m as maybeRenderHead } from '../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_BCkAozPn.mjs';
import { a as getProducts } from '../chunks/db_dt1ysPcI.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Cart = createComponent(($$result, $$props, $$slots) => {
  const products = getProducts();
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Your cart \u2014 NovaMart Stores", "data-astro-cid-h3zw4u6d": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<h1 style="margin: 2rem 0 1.25rem; letter-spacing: -0.01em" data-astro-cid-h3zw4u6d>Your cart</h1> <div class="panel empty" id="cart-empty" hidden data-astro-cid-h3zw4u6d> <div class="big" data-astro-cid-h3zw4u6d>\u{1F6D2}</div> <h2 data-astro-cid-h3zw4u6d>Your cart is empty</h2> <p data-astro-cid-h3zw4u6d>Browse the store and add a few essentials.</p> <p style="margin-top: 1rem" data-astro-cid-h3zw4u6d><a class="btn btn--primary" href="/" data-astro-cid-h3zw4u6d>Continue shopping</a></p> </div> <div id="cart-full" hidden data-astro-cid-h3zw4u6d> <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 1.5rem; align-items: start" class="cart-grid" data-astro-cid-h3zw4u6d> <div class="panel" style="padding: 0.5rem 1.25rem;" data-astro-cid-h3zw4u6d> <table class="tbl" aria-label="Cart items" data-astro-cid-h3zw4u6d> <thead data-astro-cid-h3zw4u6d> <tr data-astro-cid-h3zw4u6d> <th data-astro-cid-h3zw4u6d>Product</th> <th data-astro-cid-h3zw4u6d>Price</th> <th data-astro-cid-h3zw4u6d>Quantity</th> <th class="num" data-astro-cid-h3zw4u6d>Total</th> <th data-astro-cid-h3zw4u6d></th> </tr> </thead> <tbody id="cart-body" data-astro-cid-h3zw4u6d></tbody> </table> </div> <aside class="panel" data-astro-cid-h3zw4u6d> <h2 data-astro-cid-h3zw4u6d>Order summary</h2> <div class="totals" data-astro-cid-h3zw4u6d> <div class="row" data-astro-cid-h3zw4u6d><span data-astro-cid-h3zw4u6d>Subtotal</span><span id="sum-sub" data-astro-cid-h3zw4u6d>\u20A60</span></div> <div class="row" data-astro-cid-h3zw4u6d><span data-astro-cid-h3zw4u6d>Delivery</span><span data-astro-cid-h3zw4u6d>Calculated at checkout</span></div> <div class="row grand" data-astro-cid-h3zw4u6d><span data-astro-cid-h3zw4u6d>Total</span><span id="sum-total" data-astro-cid-h3zw4u6d>\u20A60</span></div> </div> <a href="/checkout" class="btn btn--amber btn--lg btn--block" style="margin-top: 1.25rem" data-astro-cid-h3zw4u6d>\nProceed to checkout\n</a> <a href="/" class="btn btn--ghost btn--block" style="margin-top: 0.6rem" data-astro-cid-h3zw4u6d>Continue shopping</a> </aside> </div> </div> <script id="nm-products" type="application/json">', "<\/script> ", " "])), maybeRenderHead(), unescapeHTML(JSON.stringify(products)), renderScript($$result2, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/cart.astro?astro&type=script&index=0&lang.ts")) })} `;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/cart.astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/cart.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cart,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
