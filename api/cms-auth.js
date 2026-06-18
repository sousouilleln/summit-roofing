import crypto from 'crypto';

function safeEquals(a, b) {
  try { return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')); }
  catch { return false; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const { password } = body || {};
  const correct = (process.env.CMS_PASSWORD || '').trim();

  if (!correct) {
    return res.status(500).json({ error: 'CMS_PASSWORD non configuré dans Vercel (Settings → Environment Variables)' });
  }

  if (!password || !safeEquals(String(password).trim(), correct)) {
    await new Promise(r => setTimeout(r, 500));
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  return res.status(200).json({ ok: true });
}
