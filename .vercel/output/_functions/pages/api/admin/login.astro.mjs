import { f as findAdmin } from '../../../chunks/db_CyJmpg4P.mjs';
import { d as destroySession, c as createSession } from '../../../chunks/session_djUEB8Nm.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async (context) => {
  const { request, redirect, url } = context;
  if (url.searchParams.get("logout") === "1") {
    destroySession(context);
    return redirect("/admin/login", 303);
  }
  const form = await request.formData();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/admin");
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/admin";
  const admin = findAdmin(email);
  if (!admin || admin.password !== password) {
    return redirect("/admin/login?error=" + encodeURIComponent("Invalid email or password."));
  }
  createSession(context);
  return redirect(safeNext, 303);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
