# DS Plomberie Électricité — Site Netlify

Site React/Vite déployé sur Netlify avec admin CMS personnalisé.

---

## Déploiement initial (à faire une seule fois)

### 1. Créer le dépôt GitHub
Poussez ce dossier sur un nouveau dépôt GitHub (ex: `username/ds-plomberie`).

### 2. Connecter Netlify
- Netlify → **Add new site → Import an existing project**
- Choisir le dépôt GitHub
- Build command : `npm run build`
- Publish directory : `dist`
- Cliquer **Deploy**

### 3. Générer un Personal Access Token GitHub
- GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens**
- Repository access : uniquement ce dépôt
- Permissions : **Contents → Read and write**
- Copier le token (commence par `github_pat_...`)

### 4. Configurer les variables d'environnement Netlify
Netlify → Site → **Site configuration → Environment variables** → Add variable :

| Clé | Valeur |
|-----|--------|
| `GITHUB_PAT` | `github_pat_...` (token copié ci-dessus) |
| `GITHUB_REPO` | `username/ds-plomberie` (owner/repo) |
| `CMS_PASSWORD` | mot de passe admin choisi (ex: `Plomberie2025!`) |

Après avoir ajouté les variables → **Trigger deploy** (ou pousser un commit vide).

### 5. Mettre à jour l'URL de redirection du formulaire
Dans `src/App.tsx`, remplacer :
```
value="https://VOTRE-SITE.netlify.app/merci.html"
```
par l'URL réelle du site Netlify, puis redéployer.

### 6. Activer FormSubmit
- Soumettez le formulaire de contact une première fois sur le site déployé
- FormSubmit envoie un email de confirmation à `contact@dsplomberieelectricite.com`
- Le client doit cliquer le lien de confirmation avant de recevoir les vraies demandes
- ⚠️ Vérifier aussi les **spams**

### 7. Activer les notifications email Netlify (optionnel)
Netlify → Forms → Votre formulaire → **Notifications** → Ajouter une adresse email.

---

## Accès à l'admin CMS

URL : `https://VOTRE-SITE.netlify.app/admin/`  
Mot de passe : celui défini dans `CMS_PASSWORD`

**Sections éditables :**
- Bannière (titre, sous-titre, image)
- Services (4 cartes avec titre, description, image)
- Témoignages (4 avis avec nom, texte, photo)
- FAQ (6 questions/réponses)
- Contact (téléphone, email, zone, image)

Après chaque sauvegarde, les modifications apparaissent en **1-2 minutes** (délai du redéploiement automatique Netlify).

---

## Structure du projet

```
src/App.tsx          Design + contenu dynamique
public/content/      Fichiers JSON éditables via l'admin
public/admin/        Panneau d'administration
public/assets/       Images uploadées via l'admin
netlify/functions/   Backend CMS (auth, save, upload)
netlify.toml         Config Netlify
```

---

## Sécurité

- Secrets uniquement dans les variables d'environnement Netlify, jamais dans Git
- Le PAT GitHub expire après 1 an — régénérer et mettre à jour `GITHUB_PAT` dans Netlify
- En cas de fuite du mot de passe admin : changer `CMS_PASSWORD` dans Netlify + redéployer
