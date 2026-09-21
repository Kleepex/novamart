import { defineMiddleware } from 'astro:middleware';
import { isAuthenticated } from './lib/session.js';

/** Guards /admin/* (except the login screen and its API). */
export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  const isAdminArea = pathname.startsWith('/admin');
  const isPublic = pathname === '/admin/login' || pathname === '/api/admin/login';

  if (isAdminArea && !isPublic && !isAuthenticated(context)) {
    return context.redirect('/admin/login?next=' + encodeURIComponent(pathname));
  }
  return next();
});
