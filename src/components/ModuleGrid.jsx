import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function ModuleGrid({ modules, onModuleSelect }) {
  return (
    <div className="space-y-8">
      {/* Notice */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <p className="text-blue-900 font-semibold">
          ⏰ Transmettez vos informations avant 8h30 pour une prise en compte le jour même
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(modules).map((module) => {
          const IconComponent = module.icon
          return (
            <button
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100"
            >
              {/* Couleur top */}
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-blue-500" />
              
              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 text-left mb-2">
                  {module.title}
                </h3>
                
                <p className="text-sm text-slate-600 text-left">
                  {module.description}
                </p>

                {/* CTA Button */}
                <div className="mt-4 inline-block">
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-yellow-500 transition">
                    Commencer →
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer note */}
      <div className="text-center text-sm text-slate-500 pt-8">
        <p>Ce service facilite vos démarches avec votre facteur de proximité</p>
      </div>
    </div>
  )
}
