import React, { useState } from 'react'
import { Lock, LogOut } from 'lucide-react'

export default function Header({ onAdminToggle, isAdmin }) {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleAdminLogin = (e) => {
    e.preventDefault()
    // Simple authentification - à remplacer par Supabase en production
    if (password === process.env.REACT_APP_ADMIN_PASSWORD || password === 'admin') {
      onAdminToggle(true)
      setShowAdminLogin(false)
      setPassword('')
      setError('')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-blue-900">
              FP
            </div>
            <h1 className="text-2xl font-bold">Facteur de Proximité</h1>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin ? (
              <div className="flex items-center gap-3 bg-blue-700 px-4 py-2 rounded-lg">
                <Lock size={18} />
                <span className="text-sm font-semibold">Admin</span>
                <button
                  onClick={() => onAdminToggle(false)}
                  className="ml-2 p-1 hover:bg-blue-600 rounded transition"
                  title="Déconnexion"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminLogin(!showAdminLogin)}
                className="text-sm font-medium hover:text-yellow-300 transition flex items-center gap-2"
              >
                <Lock size={16} />
                Admin
              </button>
            )}
          </div>
        </div>

        {showAdminLogin && !isAdmin && (
          <form onSubmit={handleAdminLogin} className="mt-4 flex gap-2 max-w-sm">
            <input
              type="password"
              placeholder="Mot de passe admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 rounded text-slate-900 text-sm"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-4 py-2 rounded transition"
            >
              Accès
            </button>
            {error && <span className="text-red-200 text-sm mt-2 w-full">{error}</span>}
          </form>
        )}
      </div>
    </header>
  )
}
