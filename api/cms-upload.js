import crypto from 'crypto';

const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg']);

function safeEquals(a, b) {
  try { return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')); }
  catch { return false; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const password = req.headers['x-cms-password'];
  const correct  = (process.env.CMS_PASSWORD || '').trim();
  if (!correct || !password || !safeEquals(String(password).trim(), correct)) {
    await new Promise(r => setTimeout(r, 500));
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const pat  = process.env.GITHUB_PAT;
  const repo = process.env.GITHUB_REPO;
  if (!pat || !repo) {
    return res.status(500).json({ error: 'GITHUB_PAT ou GITHUB_REPO non configuré' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const { filename, data } = body || {};
  if (!filename || !data) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^\.+/, '');
  const ext      = safeName.split('.').pop().toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return res.status(400).json({ error: 'Type de fichier non autorisé (images uniquement)' });
  }
  if (data.length > 6 * 1024 * 1024) {
    return res.status(413).json({ error: 'Image trop volumineuse (max 4 Mo)' });
  }

  const filePath = `public/assets/uploads/${safeName}`;
  const apiUrl   = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers  = {
    Authorization:  `Bearer ${pat}`,
    Accept:         'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent':   'vercel-cms-custom',
  };

  let sha;
  const checkRes = await fetch(apiUrl, { headers });
  if (checkRes.ok) sha = (await checkRes.json()).sha;

  const bodyData = { message: `CMS: upload ${safeName}`, content: data };
  if (sha) bodyData.sha = sha;

  const putRes = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify(bodyData) });
  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    return res.status(500).json({ error: err.message || 'Erreur GitHub API' });
  }

  return res.status(200).json({ url: `/assets/uploads/${safeName}` });
}

export const config = {
  api: { bodyParser: { sizeLimit: '6mb' } },
};
