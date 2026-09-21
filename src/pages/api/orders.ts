import type { APIRoute } from 'astro';
import { createOrder } from '../../lib/db';

/** Creates an order from the checkout form. Server re-validates
 *  items, prices and stock — the client only sends {id, qty}. */
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const back = (msg: string) => redirect('/checkout?error=' + encodeURIComponent(msg));

  let items: { id: string; qty: number }[] = [];
  try {
    items = JSON.parse(String(form.get('items') || '[]'));
    if (!Array.isArray(items) || items.length === 0) throw new Error();
  } catch {
    return back('Your cart appears to be empty. Please add items before checking out.');
  }

  const customer = String(form.get('customer') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const address = String(form.get('address') || '').trim();
  const city = String(form.get('city') || '').trim();
  const state = String(form.get('state') || '').trim();
  const delivery = String(form.get('delivery') || '').trim();
  if (!customer || !phone || !address || !city || !state || !delivery) {
    return back('Please complete all required delivery fields.');
  }

  try {
    const order = createOrder({
      customer, phone, address, city, state, delivery,
      email: String(form.get('email') || ''),
      notes: String(form.get('notes') || ''),
      items,
    });
    return redirect('/order/' + order.ref + '?new=1', 303);
  } catch (err) {
    return back(err instanceof Error ? err.message : 'Could not place your order. Please try again.');
  }
};
