import {
  Package,
  FileText,
  Stamp,
  Users,
  Mail,
  Info
} from 'lucide-react'

export const MODULES = {
  code_livraison: {
    id: 'code_livraison',
    title: 'Code de livraison',
    description: 'Transmettez votre code à 6 chiffres pour faciliter la remise de votre colis',
    icon: Package,
    color: 'yellow',
    fields: [
      { name: 'code', label: 'Code (6 chiffres)', type: 'text', required: true, pattern: '^[0-9]{6}$' }
    ]
  },
  recommande: {
    id: 'recommande',
    title: 'Recommandé avec tiers',
    description: 'Indiquez qu\'un tiers présent dispose d\'une procuration valable',
    icon: FileText,
    color: 'yellow',
    fields: [
      { name: 'tiers_nom', label: 'Nom du tiers', type: 'text', required: true },
      { name: 'tiers_prenom', label: 'Prénom du tiers', type: 'text', required: true },
      { name: 'procuration', label: 'Procuration présente', type: 'checkbox', required: false }
    ]
  },
  timbres_fournitures: {
    id: 'timbres_fournitures',
    title: 'Timbres & fournitures',
    description: 'Préparez votre commande à l\'avance',
    icon: Stamp,
    color: 'yellow',
    fields: [
      { 
        name: 'item', 
        label: 'Article', 
        type: 'select', 
        required: true,
        options: [
          'Timbres - Lettre 20g',
          'Timbres - Lettre 100g',
          'Enveloppe 24x32',
          'Carton A',
          'Carton B'
        ]
      },
      { name: 'quantite', label: 'Quantité', type: 'number', required: true }
    ]
  },
  tiers: {
    id: 'tiers',
    title: 'Livraison à un tiers',
    description: 'Demandez une livraison chez une personne de votre choix',
    icon: Users,
    color: 'yellow',
    fields: [
      { name: 'tiers_nom', label: 'Nom du destinataire', type: 'text', required: true },
      { name: 'tiers_adresse', label: 'Adresse', type: 'text', required: true },
      { name: 'relation', label: 'Relation', type: 'text', placeholder: 'Voisin, ami, famille...', required: true }
    ]
  },
  publicite: {
    id: 'publicite',
    title: 'Préférences publicité',
    description: 'Indiquez votre préférence concernant la distribution de publicité',
    icon: Mail,
    color: 'yellow',
    fields: [
      { 
        name: 'preference', 
        label: 'Votre choix', 
        type: 'radio',
        required: true,
        options: [
          { value: 'oui', label: 'Oui, je veux recevoir de la publicité' },
          { value: 'non', label: 'Non, pas de publicité' },
          { value: 'stop_pub', label: 'Stop Pub (aucun courrier non adressé)' }
        ]
      }
    ]
  },
  informations_utiles: {
    id: 'informations_utiles',
    title: 'Informations pratiques',
    description: 'Signalez une information utile : accès, boîte aux lettres, sécurité',
    icon: Info,
    color: 'yellow',
    fields: [
      { 
        name: 'type', 
        label: 'Type d\'information', 
        type: 'select',
        required: true,
        options: [
          'Accès difficile',
          'Boîte aux lettres endommagée',
          'Problème de sécurité',
          'Autre'
        ]
      },
      { name: 'description', label: 'Description', type: 'textarea', required: true }
    ]
  }
}

export const STATUSES = ['Nouveau', 'À traiter', 'En suivi', 'Autorisation', 'Accepté', 'Refusé', 'Traité']
