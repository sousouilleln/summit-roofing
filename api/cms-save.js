import crypto from 'crypto';

const ALLOWED_FILES = new Set(['hero', 'about', 'services', 'metrics', 'process', 'testimonials', 'faq', 'contact']);

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

  const { file, content } = body || {};

  if (!file || !ALLOWED_FILES.has(file)) {
    return res.status(400).json({ error: 'Fichier non autorisé' });
  }
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ error: 'Contenu invalide' });
  }

  const filePath = `public/content/${file}.json`;
  const apiUrl   = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers  = {
    Authorization:  `Bearer ${pat}`,
    Accept:         'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent':   'vercel-cms-custom',
  };

  let sha;
  const getRes = await fetch(apiUrl, { headers });
  if (getRes.ok) sha = (await getRes.json()).sha;

  const bodyData = {
    message: `CMS: mise à jour public/content/${file}.json`,
    content: Buffer.from(JSON.stringify(content, null, 2) + '\n').toString('base64'),
  };
  if (sha) bodyData.sha = sha;

  const putRes = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify(bodyData) });
  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    return res.status(500).json({ error: err.message || 'Erreur GitHub API' });
  }

  return res.status(200).json({ ok: true });
}
