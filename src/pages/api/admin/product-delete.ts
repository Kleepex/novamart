import type { APIRoute } from 'astro';
import { deleteProduct } from '../../../lib/db';

export const POST: APIRoute = async ({ url, redirect }) => {
  const id = url.searchParams.get('id');
  if (id) deleteProduct(id);
  return redirect('/admin/products?deleted=1', 303);
};
