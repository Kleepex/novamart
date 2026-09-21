import type { APIRoute } from 'astro';
import { saveProduct } from '../../../lib/db';

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const name = String(form.get('name') || '').trim();
  const blurb = String(form.get('blurb') || '').trim();
  if (!name || !blurb) {
    return redirect('/admin/products?error=' + encodeURIComponent('Name and description are required.'));
  }

  saveProduct({
    id: String(form.get('id') || '') || undefined,
    name,
    blurb,
    category: String(form.get('category') || ''),
    color: String(form.get('color') || '#dbeafe'),
    price: Math.max(0, Math.round(Number(form.get('price')) || 0)),
    stock: Math.max(0, Math.round(Number(form.get('stock')) || 0)),
  });

  return redirect('/admin/products?saved=1', 303);
};
