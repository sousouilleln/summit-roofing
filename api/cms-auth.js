const crypto = require('crypto');

function safeEquals(a, b) {
  try { return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')); }
  catch { return false; }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { password } = req.body || {};
  const correct = process.env.CMS_PASSWORD;

  if (!correct) {
    return res.status(500).json({ error: 'CMS_PASSWORD non configuré dans Vercel' });
  }

  if (!password || !safeEquals(password, correct)) {
    await new Promise(r => setTimeout(r, 500));
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  return res.status(200).json({ ok: true });
};
