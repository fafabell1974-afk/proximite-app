import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-3">À propos</h3>
            <p className="text-sm">Plateforme simple pour faciliter vos démarches avec votre facteur de proximité</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-3">Modules</h3>
            <ul className="text-sm space-y-1">
              <li>• Code de livraison</li>
              <li>• Recommandé</li>
              <li>• Timbres & fournitures</li>
              <li>• Livraison tiers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-3">Contact</h3>
            <p className="text-sm">Besoin d'aide ? Contactez votre facteur directement</p>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Facteur de Proximité. Service local et rapide.</p>
        </div>
      </div>
    </footer>
  )
}
