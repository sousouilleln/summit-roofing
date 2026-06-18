const crypto = require('crypto');

function safeEquals(a, b) {
  try { return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')); }
  catch { return false; }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  // Vercel parse le body JSON automatiquement, mais on gère le cas string par sécurité
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const { password } = body || {};

  // .trim() : évite les espaces/retours à la ligne copiés par erreur dans Vercel
  const correct = (process.env.CMS_PASSWORD || '').trim();

  if (!correct) {
    return res.status(500).json({ error: 'CMS_PASSWORD non configuré dans Vercel (Settings → Environment Variables)' });
  }

  if (!password || !safeEquals(String(password).trim(), correct)) {
    await new Promise(r => setTimeout(r, 500));
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  return res.status(200).json({ ok: true });
};
