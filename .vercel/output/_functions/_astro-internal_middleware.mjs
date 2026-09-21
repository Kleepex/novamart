import { e as defineMiddleware, s as sequence } from './chunks/render-context_fARUxGn5.mjs';
import { i as isAuthenticated } from './chunks/session_djUEB8Nm.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_DLaSIZqw.mjs';
import 'piccolore';
import './chunks/astro/server_BHx4noih.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  const isAdminArea = pathname.startsWith("/admin");
  const isPublic = pathname === "/admin/login" || pathname === "/api/admin/login";
  if (isAdminArea && !isPublic && !isAuthenticated(context)) {
    return context.redirect("/admin/login?next=" + encodeURIComponent(pathname));
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
