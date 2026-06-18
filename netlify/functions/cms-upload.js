// CMS — Étape 3 : téléverse une image dans assets/uploads/ du dépôt GitHub.
// Copier verbatim dans netlify/functions/cms-upload.js.
// Variables Netlify requises : CMS_PASSWORD, GITHUB_PAT, GITHUB_REPO
const crypto = require('crypto');

const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg']);

function safeEquals(a, b) {
  try { return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')); }
  catch { return false; }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const password = event.headers['x-cms-password'];
  const correct  = process.env.CMS_PASSWORD;
  if (!correct || !password || !safeEquals(password, correct)) {
    await new Promise(r => setTimeout(r, 500));
    return { statusCode: 401, body: JSON.stringify({ error: 'Non autorisé' }) };
  }

  const pat  = process.env.GITHUB_PAT;
  const repo = process.env.GITHUB_REPO;
  if (!pat || !repo) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GITHUB_PAT ou GITHUB_REPO non configuré' }) };
  }

  const { filename, data } = JSON.parse(event.body || '{}');
  if (!filename || !data) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Paramètres manquants' }) };
  }

  // Sanitize serveur-side (le code client peut être contourné).
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/^\.+/, '');
  const ext      = safeName.split('.').pop().toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Type de fichier non autorisé (images uniquement)' }) };
  }
  // ~4 Mo image → ~5.5 Mo base64 ; on bloque à 6 Mo côté serveur également.
  if (data.length > 6 * 1024 * 1024) {
    return { statusCode: 413, body: JSON.stringify({ error: 'Image trop volumineuse (max 4 Mo)' }) };
  }

  const filePath = `assets/uploads/${safeName}`;
  const apiUrl   = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers  = {
    Authorization:  `Bearer ${pat}`,
    Accept:         'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent':   'netlify-cms-custom',
  };

  let sha;
  const checkRes = await fetch(apiUrl, { headers });
  if (checkRes.ok) sha = (await checkRes.json()).sha;

  const body = { message: `CMS: upload ${safeName}`, content: data };
  if (sha) body.sha = sha;

  const putRes = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify(body) });
  if (!putRes.ok) {
    const err = await putRes.json().catch(() => ({}));
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Erreur GitHub API' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ url: `/assets/uploads/${safeName}` }) };
};
