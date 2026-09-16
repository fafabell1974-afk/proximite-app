# Facteur de Proximité - Application Web Moderne

Application web gratuite et sans installation pour faciliter les démarches avec votre facteur de proximité.

## 🎯 Caractéristiques

✅ **6 modules complets**
- Code de livraison
- Recommandé avec tiers
- Timbres & fournitures
- Livraison à un tiers
- Préférences publicité
- Informations pratiques

✅ **Design premium**
- Interface moderne et intuitive
- Couleurs jaune et bleu
- Responsive (mobile-first)
- Formulaires intelligents avec validation

✅ **QR Codes**
- Génération automatique
- Partage facile avec le facteur
- Téléchargement en PNG

✅ **Dashboard administrateur**
- Gestion des demandes
- Changement de statut
- Export CSV
- Suppression de données

✅ **Déploiement gratuit**
- Hébergé sur Vercel
- Base de données Supabase
- URL shareable

## 🚀 Déploiement en 5 minutes

### 1️⃣ Préparer Supabase (gratuit)

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte et un nouveau projet
3. Attendre le provisioning (2-3 min)
4. Aller dans SQL Editor et exécuter :

```sql
create table requests (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  module text not null,
  nom text not null,
  prenom text not null,
  adresse text not null,
  email text not null,
  telephone text,
  module_data jsonb,
  status text default 'Nouveau'
);

-- Permissions publiques (lecture/création)
alter table requests enable row level security;

create policy "Permettre lecture publique"
  on requests for select
  using (true);

create policy "Permettre création publique"
  on requests for insert
  with check (true);

create policy "Permettre mise à jour statut"
  on requests for update
  using (true)
  with check (true);

create policy "Permettre suppression admin"
  on requests for delete
  using (true);
```

5. Copier les clés dans Settings → API
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 2️⃣ Déployer sur Vercel (gratuit)

1. Pushер le code sur GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/facteur-proximite.git
   git push -u origin main
   ```

2. Aller sur [vercel.com](https://vercel.com)
3. Connecter votre compte GitHub
4. Importer ce repo
5. Ajouter les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD` (votre mot de passe admin)

6. Cliquer "Deploy" ✅

Votre app sera live en quelques secondes sur une URL Vercel gratuite !

## 🏠 Utilisation locale

```bash
# Installation
npm install

# Développement (http://localhost:3000)
npm run dev

# Build
npm run build

# Preview
npm preview
```

## 📱 Accès client

Les clients accèdent via :
- URL directe (ex: `https://facteur-proximite.vercel.app`)
- QR Code scannable généré automatiquement
- Partage du lien

## 🔐 Mot de passe admin

- URL admin : `/admin`
- Mot de passe : défini dans `VITE_ADMIN_PASSWORD`

## 📊 Dashboard admin

- Filtrer par statut
- Modifier les statuts
- Exporter en CSV
- Visualiser tous les détails

## 🛠️ Stack technique

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS
- **Database** : Supabase (PostgreSQL gratuit)
- **Hosting** : Vercel (gratuit)
- **QR Codes** : qrcode.react
- **Icons** : lucide-react

## 📋 Checklist déploiement

- [ ] Créer compte Supabase
- [ ] Créer la table SQL
- [ ] Copier les clés Supabase
- [ ] Créer repo GitHub
- [ ] Connecter Vercel
- [ ] Ajouter variables env
- [ ] Déployer
- [ ] Définir mot de passe admin
- [ ] Tester les formulaires
- [ ] Générer QR code client

## 💡 Prochaines étapes optionnelles

- Emails de confirmation automatiques (Resend/SendGrid gratuit)
- Analytics (Vercel Analytics)
- Notifications SMS
- Intégration CRM
- Logo personnalisé
- Domaine custom (5-10€/an)

## 📞 Support

Consultez la documentation :
- Vercel : https://vercel.com/docs
- Supabase : https://supabase.com/docs
- React : https://react.dev
- Tailwind : https://tailwindcss.com

---

**App gratuite, moderne, sans installation, déployée en temps réel** 🚀
