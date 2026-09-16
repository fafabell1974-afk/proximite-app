# ⚡ Démarrage Rapide (5 min)

## 1️⃣ Supabase - Base de données

```
https://supabase.com → Sign up → Create Project
Attendre 2-3 min...
Aller dans SQL Editor → New Query
Copier tout le fichier supabase.sql et Run
Aller dans Settings → API
Copier l'URL et la clé anon_public
```

**Garder précieusement :**
- `VITE_SUPABASE_URL` = votre URL
- `VITE_SUPABASE_ANON_KEY` = votre clé

---

## 2️⃣ GitHub - Code source

```bash
# Créer un nouveau repo sur github.com
# Puis en local :

git clone https://github.com/VOTRE_USERNAME/facteur-proximite.git
cd facteur-proximite

# Copier tous les fichiers du projet ici

git add .
git commit -m "Initial"
git push
```

---

## 3️⃣ Vercel - Déploiement live

1. Aller sur **https://vercel.com**
2. Sign in with GitHub
3. Importer le repo `facteur-proximite`
4. Dans "Environment Variables" ajouter :
   - `VITE_SUPABASE_URL` = votre URL Supabase
   - `VITE_SUPABASE_ANON_KEY` = votre clé Supabase
   - `VITE_ADMIN_PASSWORD` = ex: `admin123` (votre choix)
5. Cliquer "Deploy"
6. Attendre ✅
7. **Votre URL live** = affichée à l'écran

---

## 4️⃣ Test

```
https://votre-url.vercel.app

- Test client → Remplir un formulaire
- Test admin → Cliquer "Admin" → Mot de passe
- Vérifier les données dans Supabase
```

---

## 5️⃣ En production

- **Partager l'URL** avec vos clients
- **QR code automatique** pour chaque demande
- **Dashboard admin** pour gérer les demandes

---

## 🔐 Important

- Garder votre `VITE_ADMIN_PASSWORD` secret
- Variables env dans Vercel = sécurisées
- Supabase RLS = données protégées

---

## 📊 Coûts réels

- **Supabase** : Gratuit (500MB base)
- **Vercel** : Gratuit (illimité)
- **Domaine** : Optionnel (~10€/an)

**TOTAL : 0€ à ∞€ selon votre domaine**

---

## ❌ Ça ne marche pas ?

1. Vérifier les variables env dans Vercel Dashboard
2. Vérifier la table `requests` existe dans Supabase
3. Vérifier les clés sont correctes (pas d'espaces)
4. Redéployer manuellement dans Vercel

---

**Prêt ? C'est parti ! 🚀**
