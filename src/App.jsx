import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ModuleGrid from './components/ModuleGrid'
import FormPage from './components/FormPage'
import Dashboard from './components/Dashboard'
import Confirmation from './components/Confirmation'
import { MODULES } from './config/modules'

export default function App() {
  const [page, setPage] = useState('home')
  const [selectedModule, setSelectedModule] = useState(null)
  const [confirmationId, setConfirmationId] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const handleModuleSelect = (moduleKey) => {
    setSelectedModule(moduleKey)
    setPage('form')
  }

  const handleFormSubmit = (id) => {
    setConfirmationId(id)
    setPage('confirmation')
  }

  const handleBackHome = () => {
    setPage('home')
    setSelectedModule(null)
    setConfirmationId(null)
  }

  const handleAdminToggle = (admin) => {
    setIsAdmin(admin)
    if (admin) setPage('dashboard')
    else setPage('home')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onAdminToggle={handleAdminToggle} isAdmin={isAdmin} />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {page === 'home' && (
          <ModuleGrid modules={MODULES} onModuleSelect={handleModuleSelect} />
        )}
        {page === 'form' && selectedModule && (
          <FormPage 
            module={MODULES[selectedModule]} 
            moduleKey={selectedModule}
            onSubmit={handleFormSubmit}
            onBack={handleBackHome}
          />
        )}
        {page === 'confirmation' && confirmationId && (
          <Confirmation 
            id={confirmationId} 
            onHome={handleBackHome}
          />
        )}
        {page === 'dashboard' && isAdmin && (
          <Dashboard onLogout={() => handleAdminToggle(false)} />
        )}
      </main>

      <Footer />
    </div>
  )
}
