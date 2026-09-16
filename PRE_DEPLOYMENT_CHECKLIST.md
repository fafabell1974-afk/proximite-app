# ✅ Checklist Pré-Déploiement

## 🔧 Préparation technique

- [ ] Node.js 18+ installé (`node --version`)
- [ ] npm 9+ installé (`npm --version`)
- [ ] Git installé et configuré (`git config user.name`)
- [ ] Compte GitHub créé
- [ ] Compte Supabase créé
- [ ] Compte Vercel créé (via GitHub)

## 📦 Installation locale

```bash
npm install
```

- [ ] Aucune erreur lors de l'install
- [ ] Dossier `node_modules/` créé
- [ ] `package-lock.json` ou `package.json` à jour

## 🧪 Tests locaux

```bash
# Créer .env.local avec variables temporaires
npm run dev
```

- [ ] App démarre sans erreurs
- [ ] http://localhost:3000 accessible
- [ ] Tous les modules visibles
- [ ] Formulaires se chargent
- [ ] Formulaires se remplissent (sans Supabase c'est normal si erreur sauvegarde)
- [ ] Admin login fonctionne
- [ ] Dashboard s'affiche (même vide)

## 🗄️ Supabase préparé

- [ ] Compte Supabase créé
- [ ] Nouveau projet créé
- [ ] SQL script exécuté (supabase.sql)
- [ ] Table `requests` visible dans Supabase
- [ ] Colonnes correctes : id, created_at, updated_at, module, nom, prenom, etc
- [ ] RLS policies créées
- [ ] URL Supabase copiée (Settings → API)
- [ ] Clé ANON copiée (Settings → API)

## 📝 Configuration finale

- [ ] `.env.example` à jour et correct
- [ ] README.md lisible et complet
- [ ] DEPLOYMENT.md lisible et complet
- [ ] QUICK_START.md lisible et complet
- [ ] Pas de `.env` avec vraies clés (sinon rajouter à .gitignore)

## 🏗️ Build production

```bash
npm run build
```

- [ ] Build réussit sans erreurs
- [ ] Dossier `dist/` créé avec fichiers
- [ ] Pas de warnings graves

## 🌐 GitHub

- [ ] Repo créé sur github.com
- [ ] Code pushé (`git push`)
- [ ] Tous les fichiers visibles sur GitHub
- [ ] `.env` et `node_modules/` ne sont PAS pushés

## 🚀 Vercel configuré

- [ ] Vercel connecté à GitHub account
- [ ] Repo importé dans Vercel
- [ ] Variables d'environnement ajoutées :
  - [ ] `VITE_SUPABASE_URL` = (copié de Supabase)
  - [ ] `VITE_SUPABASE_ANON_KEY` = (copié de Supabase)
  - [ ] `VITE_ADMIN_PASSWORD` = (votre choix, min 8 car)
- [ ] Build command = `npm run build` (défaut OK)
- [ ] Output directory = `dist` (défaut OK)
- [ ] Deploy lancé
- [ ] Statut = "Ready" ✅

## ✅ Tests en production

```
https://votre-app.vercel.app
```

### Client flow
- [ ] Page d'accueil charge
- [ ] 6 modules visibles et cliquables
- [ ] Cliquer module → formulaire
- [ ] Formulaire se charge
- [ ] Remplir formulaire complet
- [ ] Vérifier validation (essayer envoyer vide)
- [ ] Envoyer formulaire
- [ ] Voir page confirmation
- [ ] Voir QR code
- [ ] QR code cliquable et téléchargeable

### Admin flow
- [ ] Cliquer "Admin" en haut
- [ ] Formulaire mot de passe
- [ ] Entrer password correct → Dashboard
- [ ] Dashboard se charge
- [ ] Voir demande de test
- [ ] Filtrer par statut
- [ ] Cliquer sur demande → détails
- [ ] Changer statut
- [ ] Exporter CSV
- [ ] Suppression fonctionne

### Supabase check
- [ ] Aller dans Supabase Dashboard
- [ ] Table `requests` → données visibles
- [ ] Demande de test créée avec bons champs
- [ ] Status = "Nouveau"
- [ ] Quand changé dans admin → Supabase mis à jour

## 🔒 Sécurité

- [ ] Admin password n'est pas dans Git
- [ ] Pas de clés Supabase exposées dans code
- [ ] Variables d'env utilisées via `import.meta.env.VITE_*`
- [ ] localStorage fallback fonctionne
- [ ] Supabase RLS policies actives

## 📱 Mobile

- [ ] Ouvrir sur mobile/tablet
- [ ] Layout responsive
- [ ] Touch actions fonctionnent
- [ ] QR code scannable
- [ ] Formulaires utilisables au toucher

## 📊 Performance

- [ ] App charge en < 3 sec (mobile 3G)
- [ ] Aucun warning console grave
- [ ] Pas d'erreur réseau
- [ ] Vercel Analytics optionnel mais conseillé

## 📞 Post-déploiement

- [ ] Sauvegarder l'URL Vercel
- [ ] Partager avec premiers clients
- [ ] Générer QR codes pour affichage physique
- [ ] Documenter le mot de passe admin
- [ ] Tester régulièrement

## 🎯 Optionnel (Nice to have)

- [ ] Ajouter domaine custom (Vercel → Domains)
- [ ] Configurer emails de notification
- [ ] Ajouter Analytics (Vercel Dashboard)
- [ ] Backup régulier Supabase
- [ ] Monitoring des erreurs

---

## 🆘 En cas de problème

### L'app charge mais les formulaires ne s'enregistrent pas
1. Vérifier console (F12)
2. Vérifier les variables env dans Vercel
3. Tester la connexion Supabase avec SQL simple

### Admin login ne fonctionne pas
1. Vérifier exactement la valeur de `VITE_ADMIN_PASSWORD`
2. Attention majuscules/minuscules
3. Redéployer après changement env

### Les données ne s'affichent pas dans Supabase
1. Vérifier que la table `requests` existe
2. Vérifier RLS policies (Settings → Auth → Policies)
3. Exécuter le SQL script encore une fois

### App lente au démarrage
1. C'est normal la première fois (Vercel cold start)
2. Ça s'accélère après quelques requêtes
3. Supabase gratuit a une latence naturelle

---

## ✨ Félicitations !

Si tout est coché, votre app est prête pour les clients ! 🎉

**URL à partager** : `https://votre-app.vercel.app`

**QR Code** : Généré automatiquement à chaque demande

**Admin access** : `https://votre-app.vercel.app` → Admin → Password
