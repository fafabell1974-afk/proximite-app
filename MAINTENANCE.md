# 🔧 Maintenance & Évolutions

## 📋 Maintenance quotidienne

### Dashboard admin
1. **Chaque jour** → Vérifier les nouvelles demandes
2. **Traiter rapidement** → Changer statut
3. **Archiver** → Supprimer après confirmation

### Supabase
- Aucune maintenance requise (managed service)
- Backups automatiques gratuits
- Monitoring optionnel dans Dashboard

### Vercel
- Déploiements automatiques sur git push
- Monitoring optionnel (Analytics)
- Logs disponibles en temps réel

---

## 🔄 Mises à jour du code

### Ajouter une nouvelle fonctionnalité

```bash
# 1. Modifier le code localement
git pull origin main

# 2. Tester
npm run dev

# 3. Build et test
npm run build
npm run preview

# 4. Pusher et déployer
git add .
git commit -m "Feature: description"
git push

# Vercel déploie automatiquement
```

### Modifier les modules

1. Ouvrir `src/config/modules.js`
2. Ajouter/modifier dans l'objet `MODULES`
3. Ajouter nouveaux champs dans `fields: []`
4. Commit et push

Exemple - Ajouter un module "Réclamation" :

```javascript
reclamation: {
  id: 'reclamation',
  title: 'Réclamation',
  description: 'Signalez un problème',
  icon: AlertCircle, // de lucide-react
  color: 'yellow',
  fields: [
    { name: 'type', label: 'Type', type: 'select', required: true, options: ['Retard', 'Perte', 'Autre'] },
    { name: 'description', label: 'Description', type: 'textarea', required: true }
  ]
}
```

---

## 🎨 Personnalisation

### Changer les couleurs

Fichier : `tailwind.config.js`

```javascript
colors: {
  brand: {
    yellow: '#votre-couleur-hex',
    blue: '#votre-couleur-hex'
  }
}
```

Puis remplacer dans les components :
- `from-yellow-400 to-yellow-500` → vos couleurs
- `from-blue-900 to-blue-700` → vos couleurs

### Changer le logo/branding

Fichier : `src/components/Header.jsx`

```javascript
<div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-blue-900">
  YOUR_LOGO_HERE
</div>
```

Remplacer par :
- Text (ex: "FP", "INITIALES")
- Image (importer et utiliser `<img/>`)
- Emoji (ex: "📮")

### Changer les textes statiques

Rechercher/remplacer globalement :
- "Facteur de Proximité" → votre nom
- "Consignes" message → votre texte
- "Ce service facilite..." → votre description

---

## 📊 Statistiques & Analytics

### Voir les données Supabase

```sql
-- Nombre de demandes par module
SELECT module, COUNT(*) as total 
FROM requests 
GROUP BY module;

-- Demandes par jour
SELECT DATE(created_at), COUNT(*) 
FROM requests 
GROUP BY DATE(created_at);

-- Statuts en cours
SELECT status, COUNT(*) 
FROM requests 
WHERE status != 'Traité' 
GROUP BY status;
```

### Vercel Analytics

1. Vercel Dashboard
2. Cliquer "Analytics"
3. Voir : pageviews, visitors, events

---

## 🆘 Troubleshooting courant

### "Les demandes ne s'enregistrent pas"
```bash
# 1. Vérifier logs Vercel
Vercel Dashboard → Deployments → Cliquer dernier → Logs

# 2. Vérifier Supabase
Supabase → SQL Editor → SELECT COUNT(*) FROM requests;

# 3. Vérifier variables env
Vercel → Settings → Environment Variables
```

### "Admin ne peut pas logger"
```bash
# Le mot de passe a changé ? 
# Vercel → Settings → Environment Variables
# Changer VITE_ADMIN_PASSWORD
# Redéployer : redeploy button
```

### "App est lente"
```
Normal après changement. Vercel réchauffe le serveur.
Vérifier :
- Browser dev tools → Network → performance
- Supabase dashboard → Queries
- Vercel analytics → response times
```

---

## 🚨 Sauvegardes & Sécurité

### Backup de données

**Supabase gratuit** = backups quotidiens automatiques

Pour export manuel :

```bash
# Via Supabase CLI
npm install -g supabase
supabase db pull # Télécharge schema
supabase db dump # Exporte données
```

Ou via Supabase UI :
1. SQL Editor → Queries
2. `SELECT * FROM requests;`
3. Download as CSV

### Rotation du mot de passe admin

1. Vercel Dashboard
2. Settings → Environment Variables
3. Changer `VITE_ADMIN_PASSWORD`
4. Redeploy

---

## 📈 Évolutions futures

### Ajouter emails de confirmation

Utiliser [Resend.com](https://resend.com) (gratuit) :

```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// À chaque soumission
await resend.emails.send({
  from: 'noreply@facteur.com',
  to: formData.email,
  subject: 'Demande reçue',
  html: `<p>Merci ! Ref: ${id}</p>`
});
```

### Ajouter notifications SMS

Utiliser [Twilio](https://twilio.com) (payant) ou [OVH SMS](https://www.ovh.com/fr/sms/)

### Intégrer un CRM

Zapier → Connecter Supabase à :
- Salesforce
- HubSpot
- Pipedrive
- Slack

### Ajouter un système de statut email

Chaque changement de statut → Email au client avec tracking URL

---

## 🎓 Apprendre plus

- React : https://react.dev/learn
- Tailwind : https://tailwindcss.com/docs
- Supabase : https://supabase.com/docs
- Vercel : https://vercel.com/docs

---

## 📞 Support

- Supabase Issues : https://github.com/supabase/supabase
- Vercel Support : https://vercel.com/support
- React Issues : https://github.com/facebook/react
- Tailwind : https://tailwindcss.com/docs

---

L'app est prête pour la production ! Bon courage ! 🚀
