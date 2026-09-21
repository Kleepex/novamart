import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CBo4t70V.mjs';
import { manifest } from './manifest_CSqfXnBJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin/orders/_ref_.astro.mjs');
const _page3 = () => import('./pages/admin/orders.astro.mjs');
const _page4 = () => import('./pages/admin/products/_id_.astro.mjs');
const _page5 = () => import('./pages/admin/products.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/api/admin/login.astro.mjs');
const _page8 = () => import('./pages/api/admin/order-status.astro.mjs');
const _page9 = () => import('./pages/api/admin/product-delete.astro.mjs');
const _page10 = () => import('./pages/api/admin/product-save.astro.mjs');
const _page11 = () => import('./pages/api/orders.astro.mjs');
const _page12 = () => import('./pages/cart.astro.mjs');
const _page13 = () => import('./pages/checkout.astro.mjs');
const _page14 = () => import('./pages/order/_ref_.astro.mjs');
const _page15 = () => import('./pages/product/_id_.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/login.astro", _page1],
    ["src/pages/admin/orders/[ref].astro", _page2],
    ["src/pages/admin/orders/index.astro", _page3],
    ["src/pages/admin/products/[id].astro", _page4],
    ["src/pages/admin/products/index.astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/api/admin/login.ts", _page7],
    ["src/pages/api/admin/order-status.ts", _page8],
    ["src/pages/api/admin/product-delete.ts", _page9],
    ["src/pages/api/admin/product-save.ts", _page10],
    ["src/pages/api/orders.ts", _page11],
    ["src/pages/cart.astro", _page12],
    ["src/pages/checkout.astro", _page13],
    ["src/pages/order/[ref].astro", _page14],
    ["src/pages/product/[id].astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "b2fe852e-991e-4711-87a1-7b6e32441d0d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
