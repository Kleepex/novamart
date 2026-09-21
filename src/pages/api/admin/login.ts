import type { APIRoute } from 'astro';
import { findAdmin } from '../../../lib/db';
import { createSession, destroySession } from '../../../lib/session';

export const POST: APIRoute = async (context) => {
  const { request, redirect, url } = context;

  if (url.searchParams.get('logout') === '1') {
    destroySession(context);
    return redirect('/admin/login', 303);
  }

  const form = await request.formData();
  const email = String(form.get('email') || '');
  const password = String(form.get('password') || '');
  const next = String(form.get('next') || '/admin');
  const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/admin';

  const admin = await findAdmin(email);
  if (!admin || admin.password !== password) {
    return redirect('/admin/login?error=' + encodeURIComponent('Invalid email or password.'));
  }

  createSession(context);
  return redirect(safeNext, 303);
};
