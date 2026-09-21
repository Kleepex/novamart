import { timingSafeEqual, createHmac } from 'node:crypto';

/** Signed-cookie admin session (HMAC). Demo-grade auth —
 *  production deployments should plug in a full auth provider. */

const SECRET = process.env.NOVAMART_SECRET || 'novamart-demo-secret-change-me';
const COOKIE = 'nm_admin';
const TTL_MS = 1000 * 60 * 60 * 8; // 8 hours
const IS_PRODUCTION = process.env.NODE_ENV === 'production' || Boolean(process.env.PUBLIC_URL);

const sign = (value) => createHmac('sha256', SECRET).update(value).digest('hex');

function createSession(Astro) {
  const exp = Date.now() + TTL_MS;
  const payload = `admin:${exp}`;
  Astro.cookies.set(COOKIE, `${payload}.${sign(payload)}`, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: IS_PRODUCTION,
    maxAge: TTL_MS / 1000,
  });
}

function destroySession(Astro) {
  Astro.cookies.delete(COOKIE, { path: '/', secure: IS_PRODUCTION });
}

function isAuthenticated(Astro) {
  const raw = Astro.cookies.get(COOKIE)?.value;
  if (!raw) return false;
  const i = raw.lastIndexOf('.');
  if (i < 0) return false;
  const payload = raw.slice(0, i);
  const sig = raw.slice(i + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const [, exp] = payload.split(':');
  return Number(exp) > Date.now();
}

export { createSession as c, destroySession as d, isAuthenticated as i };
