import { e as createOrder } from '../../chunks/db_dt1ysPcI.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, redirect }) => {
  const form = await request.formData();
  const back = (msg) => redirect("/checkout?error=" + encodeURIComponent(msg));
  let items = [];
  try {
    items = JSON.parse(String(form.get("items") || "[]"));
    if (!Array.isArray(items) || items.length === 0) throw new Error();
  } catch {
    return back("Your cart appears to be empty. Please add items before checking out.");
  }
  const customer = String(form.get("customer") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const address = String(form.get("address") || "").trim();
  const city = String(form.get("city") || "").trim();
  const state = String(form.get("state") || "").trim();
  const delivery = String(form.get("delivery") || "").trim();
  if (!customer || !phone || !address || !city || !state || !delivery) {
    return back("Please complete all required delivery fields.");
  }
  try {
    const order = createOrder({
      customer,
      phone,
      address,
      city,
      state,
      delivery,
      email: String(form.get("email") || ""),
      notes: String(form.get("notes") || ""),
      items
    });
    return redirect("/order/" + order.ref + "?new=1", 303);
  } catch (err) {
    return back(err instanceof Error ? err.message : "Could not place your order. Please try again.");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
