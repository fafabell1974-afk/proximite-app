# 📁 Structure du projet

```
facteur-proximite/
├── 📄 README.md                 ← Guide complet
├── 📄 DEPLOYMENT.md             ← Guide détaillé déploiement
├── 📄 QUICK_START.md            ← Démarrage rapide (à lire en 1er)
├── 📄 PROJECT_STRUCTURE.md      ← Ce fichier
│
├── index.html                   ← Entrée HTML
├── vite.config.js              ← Config Vite
├── tailwind.config.js          ← Config Tailwind CSS
├── postcss.config.js           ← Config PostCSS
├── vercel.json                 ← Config Vercel
│
├── .env.example                ← Variables d'env template
├── .gitignore                  ← Ignorer node_modules etc
├── package.json                ← Dépendances NPM
├── supabase.sql                ← Script SQL Supabase
│
├── 📁 src/
│   ├── main.jsx                ← Point d'entrée React
│   ├── index.css               ← Styles globaux + Tailwind
│   ├── App.jsx                 ← Composant principal
│   │
│   ├── 📁 components/
│   │   ├── Header.jsx          ← En-tête + login admin
│   │   ├── Footer.jsx          ← Pied de page
│   │   ├── ModuleGrid.jsx      ← Grille des 6 modules
│   │   ├── FormPage.jsx        ← Formulaire complet
│   │   ├── Confirmation.jsx    ← Confirmation + QR code
│   │   └── Dashboard.jsx       ← Panel admin
│   │
│   ├── 📁 config/
│   │   └── modules.js          ← Config des 6 modules
│   │
│   └── 📁 lib/
│       └── supabase.js         ← Utilitaires Supabase
│
└── 📁 dist/                     ← Build produit (généré)
    ├── index.html
    └── assets/
        ├── *.js
        └── *.css
```

## 📋 Description fichiers clés

### Configuration
- **vite.config.js** - Vite builder (React fast refresh, HMR)
- **tailwind.config.js** - Tailwind CSS colors/theme
- **postcss.config.js** - PostCSS plugins (tailwind, autoprefixer)
- **vercel.json** - Déploiement sur Vercel

### Base de données
- **supabase.sql** - Script pour créer tables/policies
- **src/lib/supabase.js** - Client Supabase + fallback localStorage

### Components React
- **Header.jsx** - Branding + Admin login
- **ModuleGrid.jsx** - Affichage des 6 modules avec cartes
- **FormPage.jsx** - Formulaires dynamiques par module
- **Confirmation.jsx** - Confirmation + QR code + infos
- **Dashboard.jsx** - Admin panel (filtrer/modifier/exporter)
- **Footer.jsx** - Footer simple

### Configuration métier
- **src/config/modules.js** - Définition des 6 modules

## 🎨 Design

- **Couleurs** : Jaune (#fbbf24) + Bleu (#1e40af)
- **Typo** : System fonts + Tailwind
- **Responsive** : Mobile-first
- **Icons** : lucide-react

## 🔄 Flux utilisateur

1. Client arrive sur l'app
2. Voit 6 modules sur home
3. Clique sur un module → Formulaire
4. Remplit formulaire + infos perso
5. Envoie → Confirmation avec QR code
6. Données sauvegardées dans Supabase

## 👨‍💼 Flux admin

1. Admin clique "Admin" → mot de passe
2. Voit dashboard avec toutes les demandes
3. Peut filtrer par statut
4. Cliquer sur demande → voir tous les détails
5. Changer statut
6. Exporter en CSV

## 📦 Dépendances

```
react & react-dom           → Framework UI
lucide-react               → Icons (Package, Mail, etc)
qrcode.react              → Génération QR codes
@supabase/supabase-js     → Client DB
tailwindcss               → CSS framework
vite & @vitejs/plugin-react → Build tool
```

## 🚀 Déploiement

```
Git repo GitHub
    ↓
Push → Vercel redéploie automatiquement
    ↓
Accès public via https://xxx.vercel.app
    ↓
Supabase stocke les données
```

## 🔐 Sécurité

- ✅ RLS Supabase (Row Level Security)
- ✅ Clés publiques sécurisées
- ✅ Mot de passe admin en env var
- ✅ CORS configuré Vercel → Supabase

## 📊 Base de données

Table `requests` :
- id (primary key)
- created_at / updated_at
- module (string)
- nom, prenom, adresse, email, telephone
- module_data (JSON - données du formulaire)
- status (Nouveau/Traité/Accepté/Refusé)
- notes (admin)

Avec index sur : status, created_at, email, module
Avec RLS policies pour sécurité

---

Tous les fichiers sont prêts pour déploiement production ! 🚀
