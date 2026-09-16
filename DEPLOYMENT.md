# 🚀 Guide de Déploiement Complet

## Étape 1 : Préparer Supabase (Base de données gratuite)

### 1.1 Créer un compte
1. Aller sur https://supabase.com
2. Cliquer "Start your project" 
3. Se connecter avec GitHub (plus rapide)
4. Créer une nouvelle organisation

### 1.2 Créer un nouveau projet
1. Donner un nom au projet (ex: "facteur-proximite")
2. Choisir la région la plus proche (EU - France)
3. Définir un mot de passe fort pour la database
4. Attendre 2-3 minutes le provisioning

### 1.3 Créer la structure de la base
1. Dans Supabase, aller à **SQL Editor** (icône < > en bas à gauche)
2. Cliquer **New Query**
3. Copier tout le contenu du fichier `supabase.sql`
4. Cliquer **Run** (triangle ▶️)
5. Vérifier que tout s'est bien exécuté ✅

### 1.4 Récupérer les clés d'accès
1. Aller à **Settings** → **API**
2. Sous "Project API keys", copier :
   - **URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
3. Garder ces valeurs pour Vercel

---

## Étape 2 : Préparer GitHub (Code source)

### 2.1 Créer un compte GitHub (si nécessaire)
- https://github.com/signup
- Ou se connecter si vous avez déjà un compte

### 2.2 Créer un nouveau repository
1. Cliquer "New" (bouton vert) ou aller https://github.com/new
2. Nommer le repo `facteur-proximite`
3. Cocher "Add a README file"
4. Cliquer "Create repository"

### 2.3 Push le code
```bash
# Cloner le repo fraîchement créé
git clone https://github.com/VOTRE_USERNAME/facteur-proximite.git
cd facteur-proximite

# Copier tous les fichiers du projet ici
# (tous les fichiers sauf .git)

# Initialiser et push
git add .
git commit -m "Version initiale - app Facteur de Proximité"
git push -u origin main
```

---

## Étape 3 : Déployer sur Vercel (Hosting gratuit)

### 3.1 Se connecter à Vercel
1. Aller sur https://vercel.com
2. Cliquer "Sign up"
3. Connecter votre compte GitHub (méthode recommandée)
4. Autoriser Vercel à accéder à vos repos

### 3.2 Importer le projet
1. Cliquer "Add New..." → "Project"
2. Chercher et sélectionner `facteur-proximite`
3. Cliquer "Import"

### 3.3 Configurer les variables d'environnement
1. Dans "Environment Variables", ajouter :

| Clé | Valeur | Source |
|-----|--------|--------|
| `VITE_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Settings → API |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Settings → API |
| `VITE_ADMIN_PASSWORD` | `monsecret2024` | À définir vous-même |

2. Cliquer "Deploy"

### 3.4 Attendre le déploiement
- Vercel construit et déploie automatiquement
- ⏱️ ~1-2 minutes
- ✅ "Deployment successful" = app en ligne !

### 3.5 Récupérer l'URL
1. Cliquer "Visit" pour voir l'app en production
2. L'URL au format : `https://facteur-proximite.vercel.app`
3. Partager ce lien avec vos clients !

---

## Étape 4 : Configuration finale

### 4.1 Test local avant le déploiement (optionnel)
```bash
# Créer un fichier .env.local
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_ADMIN_PASSWORD=monsecret2024

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Ouvrir http://localhost:3000
```

### 4.2 Test admin
1. Aller sur l'app en production
2. Cliquer sur "Admin" en haut à droite
3. Entrer votre mot de passe `VITE_ADMIN_PASSWORD`
4. Vous devez accéder au dashboard

### 4.3 Test formulaire
1. Retour à l'accueil
2. Cliquer sur un module (ex: "Code de livraison")
3. Remplir le formulaire
4. Soumettre
5. Voir la confirmation avec QR code

### 4.4 Vérifier dans Supabase
1. Retourner à Supabase
2. Table Editor → `requests`
3. Vous devez voir votre test submission ✅

---

## 🔗 Génération du QR Code client

Après chaque soumission, un QR code est généré automatiquement :
- **Lisible directement** depuis le navigateur
- **Téléchargeable** en PNG
- **Pointant vers** l'app web directement

Les clients reçoivent soit :
- L'URL directe : `https://facteur-proximite.vercel.app`
- Le QR code à imprimer/afficher
- Les deux pour plus de flexibilité

---

## 🔄 Mise à jour du code

Après le déploiement, pour mettre à jour :

```bash
# Faire les modifications locales
# Puis pusher sur GitHub

git add .
git commit -m "Nouvelle feature"
git push

# Vercel redéploie automatiquement en quelques secondes
```

---

## 🆘 Troubleshooting

### L'app affiche "Variables Supabase manquantes"
→ Vérifier que les variables d'env sont bien définies dans Vercel

### Les demandes ne s'enregistrent pas
→ Vérifier la table `requests` existe dans Supabase
→ Vérifier les clés Supabase sont correctes

### Le mot de passe admin ne fonctionne pas
→ Vérifier la valeur exacte de `VITE_ADMIN_PASSWORD` dans Vercel
→ Attention : majuscules/minuscules comptent

### L'app est lente
→ C'est normal en phase initiale
→ Vercel cache et optimise après les premiers accès
→ Supabase gratuit a quelques secondes de latence

---

## 📊 Coûts

| Service | Coût | Limite gratuite |
|---------|------|-----------------|
| Supabase DB | Gratuit | 500 MB + 2 GB upload |
| Vercel Hosting | Gratuit | Illimité pour proj perso |
| Domaine perso | ~10€/an | (optionnel) |
| **TOTAL** | **Gratuit** | Sans domaine perso |

---

## 🎯 Prêt ? Commencer ici :

1. ✅ Supabase https://supabase.com
2. ✅ GitHub https://github.com/new
3. ✅ Vercel https://vercel.com

**Temps total : ~15 minutes de configuration, app live pour toujours ! 🚀**
