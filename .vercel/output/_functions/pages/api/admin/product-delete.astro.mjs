import { d as deleteProduct } from '../../../chunks/db_dt1ysPcI.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ url, redirect }) => {
  const id = url.searchParams.get("id");
  if (id) deleteProduct(id);
  return redirect("/admin/products?deleted=1", 303);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
