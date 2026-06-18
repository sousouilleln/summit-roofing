# DS Plomberie Électricité — Site Vercel

Site React/Vite déployé sur Vercel avec admin CMS personnalisé.

---

## Déploiement initial (à faire une seule fois)

### 1. Connecter Vercel
- [vercel.com](https://vercel.com) → **Add New Project → Import Git Repository**
- Choisir le dépôt `sousouilleln/summit-roofing`
- Framework Preset : **Vite** (détecté automatiquement)
- Build command : `npm run build`
- Output directory : `dist`
- Cliquer **Deploy**

### 2. Générer un Personal Access Token GitHub
- GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**
- Repository access : uniquement ce dépôt
- Permissions : **Contents → Read and write**
- Copier le token (commence par `github_pat_...`)

### 3. Configurer les variables d'environnement Vercel
Vercel → Projet → **Settings → Environment Variables** → Add :

| Clé | Valeur |
|-----|--------|
| `GITHUB_PAT` | `github_pat_...` (token copié ci-dessus) |
| `GITHUB_REPO` | `sousouilleln/summit-roofing` |
| `CMS_PASSWORD` | mot de passe admin choisi (ex: `Plomberie2025!`) |

Après avoir ajouté les variables → **Redeploy** (Deployments → ⋯ → Redeploy).

### 4. Mettre à jour l'URL de redirection du formulaire
Dans `src/App.tsx`, remplacer :
```
value="https://VOTRE-SITE.vercel.app/merci.html"
```
par l'URL réelle du site (ex: `https://summit-roofing.vercel.app/merci.html`), puis pousser un commit pour redéployer.

### 5. Activer FormSubmit (IMPORTANT — lire attentivement)
1. Dans l'**Admin CMS** → onglet Contact → mettre le **vrai email** du client (celui qui recevra les demandes de devis)
2. Sauvegarder → attendre le redéploiement (~1 min)
3. Soumettre le formulaire de contact sur le site une première fois
4. FormSubmit envoie un **email de validation** à l'adresse configurée
5. ⚠️ **Vérifier les spams** — l'email de validation arrive souvent en spam
6. Cliquer le lien de confirmation → les vraies demandes arrivent ensuite normalement

---

## Accès à l'admin CMS

URL : `https://VOTRE-SITE.vercel.app/admin/`  
Mot de passe : celui défini dans `CMS_PASSWORD`

**Sections éditables :**
- Bannière (titre, sous-titre, image)
- Services (4 cartes avec titre, description, image)
- Témoignages (4 avis avec nom, texte, photo)
- FAQ (6 questions/réponses)
- Contact (téléphone, **email devis**, zone, image)

Après chaque sauvegarde, les modifications sont visibles en **1-2 minutes** (redéploiement automatique Vercel déclenché par le commit GitHub).

---

## Structure du projet

```
src/App.tsx          Design + contenu dynamique
public/content/      Fichiers JSON éditables via l'admin
public/admin/        Panneau d'administration
public/assets/       Images uploadées via l'admin
api/                 Fonctions serverless Vercel (auth, save, upload)
vercel.json          Config Vercel
```

---

## Sécurité

- Secrets uniquement dans les variables d'environnement Vercel, jamais dans Git
- Le PAT GitHub expire après 1 an — régénérer et mettre à jour `GITHUB_PAT` dans Vercel
- En cas de fuite du mot de passe admin : changer `CMS_PASSWORD` dans Vercel + redéployer
