import { u as updateOrderStatus } from '../../../chunks/db_dt1ysPcI.mjs';
import { O as ORDER_STATUSES } from '../../../chunks/format_CeNNESN9.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ url, request, redirect }) => {
  const ref = url.searchParams.get("ref") || "";
  const form = await request.formData();
  const status = String(form.get("status") || "");
  if (ref && ORDER_STATUSES.includes(status)) {
    updateOrderStatus(ref, status);
  }
  return redirect("/admin/orders/" + ref + "?saved=1", 303);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
