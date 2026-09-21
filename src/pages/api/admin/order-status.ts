import type { APIRoute } from 'astro';
import { updateOrderStatus } from '../../../lib/db';
import { ORDER_STATUSES } from '../../../lib/format';

export const POST: APIRoute = async ({ url, request, redirect }) => {
  const ref = url.searchParams.get('ref') || '';
  const form = await request.formData();
  const status = String(form.get('status') || '');
  if (ref && ORDER_STATUSES.includes(status)) {
    await updateOrderStatus(ref, status);
  }
  return redirect('/admin/orders/' + ref + '?saved=1', 303);
};
