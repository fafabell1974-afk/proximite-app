import React, { useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'

export default function FormPage({ module, moduleKey, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    telephone: ''
  })
  const [moduleData, setModuleData] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleModuleChange = (e) => {
    const { name, value, type, checked } = e.target
    setModuleData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.nom.trim()) newErrors.nom = 'Nom requis'
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis'
    if (!formData.adresse.trim()) newErrors.adresse = 'Adresse requise'
    if (!formData.email.trim()) newErrors.email = 'Email requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide'

    module.fields.forEach(field => {
      if (field.required && !moduleData[field.name]) {
        newErrors[field.name] = `${field.label} requis`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      // Simulation stockage - à remplacer par Supabase
      const id = Date.now()
      const data = {
        id,
        created_at: new Date().toISOString(),
        module: moduleKey,
        ...formData,
        moduleData,
        status: 'Nouveau'
      }
      localStorage.setItem(`request_${id}`, JSON.stringify(data))
      onSubmit(id)
    } catch (error) {
      setErrors({ submit: 'Erreur lors de la soumission' })
    } finally {
      setLoading(false)
    }
  }

  const IconComponent = module.icon

  return (
    <div className="space-y-6">
      {/* Bouton retour */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
      >
        <ArrowLeft size={20} />
        Retour aux modules
      </button>

      {/* En-tête */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-yellow-400 to-blue-500" />
        <div className="p-8 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-blue-100 rounded-xl flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{module.title}</h2>
            <p className="text-slate-600 mt-1">{module.description}</p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 space-y-8">
        
        {/* Section infos personnelles */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Vos informations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                  errors.prenom 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                } outline-none`}
                placeholder="Votre prénom"
              />
              {errors.prenom && <p className="text-red-600 text-sm mt-1">{errors.prenom}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Nom *
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                  errors.nom 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                } outline-none`}
                placeholder="Votre nom"
              />
              {errors.nom && <p className="text-red-600 text-sm mt-1">{errors.nom}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Adresse *
              </label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                  errors.adresse 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                } outline-none`}
                placeholder="Votre adresse complète"
              />
              {errors.adresse && <p className="text-red-600 text-sm mt-1">{errors.adresse}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                  errors.email 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                } outline-none`}
                placeholder="votre.email@exemple.fr"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:bg-blue-50 outline-none transition"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
          </div>
        </div>

        {/* Section spécifique au module */}
        <div className="border-t-2 border-slate-200 pt-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-400 text-blue-900 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Détails de votre demande
          </h3>

          <div className="space-y-4">
            {module.fields.map(field => (
              <div key={field.name}>
                {field.type === 'text' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {field.label} {field.required && '*'}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={moduleData[field.name] || ''}
                      onChange={handleModuleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors[field.name] 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                      } outline-none`}
                      placeholder={field.placeholder || ''}
                      pattern={field.pattern}
                    />
                    {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>}
                  </div>
                )}

                {field.type === 'number' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {field.label} {field.required && '*'}
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      value={moduleData[field.name] || ''}
                      onChange={handleModuleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors[field.name] 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                      } outline-none`}
                      min="1"
                    />
                    {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>}
                  </div>
                )}

                {field.type === 'textarea' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {field.label} {field.required && '*'}
                    </label>
                    <textarea
                      name={field.name}
                      value={moduleData[field.name] || ''}
                      onChange={handleModuleChange}
                      rows="4"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors[field.name] 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                      } outline-none resize-none`}
                      placeholder="Décrivez votre demande..."
                    />
                    {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>}
                  </div>
                )}

                {field.type === 'select' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      {field.label} {field.required && '*'}
                    </label>
                    <select
                      name={field.name}
                      value={moduleData[field.name] || ''}
                      onChange={handleModuleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                        errors[field.name] 
                          ? 'border-red-400 bg-red-50' 
                          : 'border-slate-200 focus:border-blue-500 focus:bg-blue-50'
                      } outline-none`}
                    >
                      <option value="">-- Sélectionner --</option>
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name]}</p>}
                  </div>
                )}

                {field.type === 'checkbox' && (
                  <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={moduleData[field.name] || false}
                      onChange={handleModuleChange}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="font-semibold text-slate-900">{field.label}</span>
                  </label>
                )}

                {field.type === 'radio' && (
                  <div className="space-y-3">
                    {field.options.map(option => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition border-2 border-transparent" style={{
                        borderColor: moduleData[field.name] === option.value ? '#f59e0b' : 'transparent',
                        backgroundColor: moduleData[field.name] === option.value ? '#fef3c7' : '#f8fafc'
                      }}>
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={moduleData[field.name] === option.value}
                          onChange={handleModuleChange}
                          className="w-5 h-5 accent-yellow-400"
                        />
                        <span className="font-semibold text-slate-900">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Boutons */}
        <div className="border-t-2 border-slate-200 pt-8 flex gap-4 justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border-2 border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold rounded-lg transition disabled:opacity-50"
          >
            <Send size={20} />
            {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>
        </div>
      </form>
    </div>
  )
}
