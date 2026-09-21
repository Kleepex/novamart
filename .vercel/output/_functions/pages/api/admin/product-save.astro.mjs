import { s as saveProduct } from '../../../chunks/db_CyJmpg4P.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const blurb = String(form.get("blurb") || "").trim();
  if (!name || !blurb) {
    return redirect("/admin/products?error=" + encodeURIComponent("Name and description are required."));
  }
  saveProduct({
    id: String(form.get("id") || "") || void 0,
    name,
    blurb,
    category: String(form.get("category") || ""),
    color: String(form.get("color") || "#dbeafe"),
    price: Math.max(0, Math.round(Number(form.get("price")) || 0)),
    stock: Math.max(0, Math.round(Number(form.get("stock")) || 0))
  });
  return redirect("/admin/products?saved=1", 303);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
