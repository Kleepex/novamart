import { e as createComponent, l as renderHead, r as renderTemplate, g as addAttribute, h as createAstro } from '../../chunks/astro/server_BHx4noih.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
import { i as isAuthenticated } from '../../chunks/session_djUEB8Nm.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (isAuthenticated(Astro2)) return Astro2.redirect("/admin");
  const error = Astro2.url.searchParams.get("error");
  const next = Astro2.url.searchParams.get("next") || "/admin";
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Admin sign in — NovaMart</title><meta name="robots" content="noindex"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">${renderHead()}</head> <body> <div class="login-wrap"> <div class="login-card"> <a href="/" class="brand"> <span class="brand__mark">N</span> <span>NovaMart<small>Admin</small></span> </a> <h1>Sign in</h1> <p style="color: var(--ink-soft); font-size: 0.94rem">Manage products, orders and stock.</p> ${error && renderTemplate`<div class="notice notice--err" style="margin-top: 1rem">${error}</div>`} <form method="POST" action="/api/admin/login" style="display: grid; gap: 1rem; margin-top: 1.4rem"> <input type="hidden" name="next"${addAttribute(next, "value")}> <div class="field"> <label for="l-email">Email</label> <input id="l-email" name="email" type="email" required autocomplete="username" placeholder="admin@novamart.demo"> </div> <div class="field"> <label for="l-pass">Password</label> <input id="l-pass" name="password" type="password" required autocomplete="current-password" placeholder="••••••••••"> </div> <button class="btn btn--primary btn--lg btn--block" type="submit">Sign in</button> </form> <div class="cred"> <b>Admin credentials</b><br>
Email: <code>admin@novamart.demo</code><br>
Password: <code>novamart123</code> </div> <p style="margin-top: 1.1rem; font-size: 0.85rem"><a href="/">← Back to store</a></p> </div> </div> </body></html>`;
}, "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/stephen emmanuel/Downloads/novamart/novamart/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
