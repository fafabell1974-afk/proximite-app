import React, { useState, useEffect } from 'react'
import { Eye, EyeOff, Download, Trash2 } from 'lucide-react'
import { MODULES, STATUSES } from '../config/modules'

export default function Dashboard({ onLogout }) {
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState('Nouveau')
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = () => {
    const allRequests = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith('request_')) {
        const data = JSON.parse(localStorage.getItem(key))
        allRequests.push(data)
      }
    }
    allRequests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    setRequests(allRequests)
  }

  const updateStatus = (id, newStatus) => {
    const request = requests.find(r => r.id === id)
    if (request) {
      request.status = newStatus
      request.updated_at = new Date().toISOString()
      localStorage.setItem(`request_${id}`, JSON.stringify(request))
      loadRequests()
    }
  }

  const deleteRequest = (id) => {
    if (confirm('Confirmer la suppression ?')) {
      localStorage.removeItem(`request_${id}`)
      loadRequests()
    }
  }

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Module', 'Nom', 'Prénom', 'Adresse', 'Email', 'Status', 'Données']
    const rows = requests.map(r => [
      r.id,
      new Date(r.created_at).toLocaleString('fr-FR'),
      MODULES[r.module]?.title || r.module,
      r.nom,
      r.prenom,
      r.adresse,
      r.email,
      r.status,
      JSON.stringify(r.moduleData)
    ])

    let csv = headers.join(',') + '\n'
    rows.forEach(row => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n'
    })

    const link = document.createElement('a')
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
    link.download = `demandes_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const filteredRequests = requests.filter(r => r.status === filter || filter === 'Tous')

  const statusColors = {
    'Nouveau': 'bg-blue-100 text-blue-800 border-blue-300',
    'À traiter': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'En suivi': 'bg-purple-100 text-purple-800 border-purple-300',
    'Autorisation': 'bg-orange-100 text-orange-800 border-orange-300',
    'Accepté': 'bg-green-100 text-green-800 border-green-300',
    'Refusé': 'bg-red-100 text-red-800 border-red-300',
    'Traité': 'bg-slate-100 text-slate-800 border-slate-300'
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Tableau de bord</h2>
            <p className="text-slate-600 mt-1">{requests.length} demande{requests.length > 1 ? 's' : ''} au total</p>
          </div>
          <button
            onClick={onLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Filtres et actions */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {['Tous', ...STATUSES].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === status
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          <Download size={18} />
          Exporter CSV
        </button>
      </div>

      {/* Liste des demandes */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 text-center text-slate-600">
            Aucune demande pour ce statut
          </div>
        ) : (
          filteredRequests.map(request => (
            <div
              key={request.id}
              className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition"
            >
              {/* En-tête de la demande */}
              <div className="p-6 cursor-pointer hover:bg-slate-50 transition" onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-slate-500">#{request.id}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${statusColors[request.status]}`}>
                        {request.status}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(request.created_at).toLocaleString('fr-FR')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Client</p>
                        <p className="font-semibold text-slate-900">{request.prenom} {request.nom}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Module</p>
                        <p className="font-semibold text-slate-900">{MODULES[request.module]?.title || request.module}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Contact</p>
                        <p className="font-semibold text-slate-900 truncate">{request.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {expandedId === request.id ? <EyeOff size={24} /> : <Eye size={24} />}
                  </div>
                </div>
              </div>

              {/* Détails développés */}
              {expandedId === request.id && (
                <div className="border-t border-slate-200 p-6 bg-slate-50 space-y-6">
                  {/* Infos personnelles */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Informations personnelles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Prénom</p>
                        <p className="font-semibold text-slate-900">{request.prenom}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Nom</p>
                        <p className="font-semibold text-slate-900">{request.nom}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-slate-500">Adresse</p>
                        <p className="font-semibold text-slate-900">{request.adresse}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Email</p>
                        <p className="font-semibold text-slate-900 truncate">{request.email}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Téléphone</p>
                        <p className="font-semibold text-slate-900">{request.telephone || '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Données du module */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Détails de la demande</h4>
                    <div className="bg-white p-4 rounded-lg text-sm space-y-2">
                      {Object.entries(request.moduleData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-600">{key}:</span>
                          <span className="font-semibold text-slate-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Changement de statut */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3">Changer le statut</h4>
                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map(status => (
                        <button
                          key={status}
                          onClick={() => updateStatus(request.id, status)}
                          className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                            request.status === status
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-900 border-2 border-slate-300 hover:border-blue-600'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suppression */}
                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <button
                      onClick={() => deleteRequest(request.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition"
                    >
                      <Trash2 size={18} />
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
