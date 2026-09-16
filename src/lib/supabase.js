import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Variables Supabase manquantes - utilisation du stockage local')
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Fonctions de fallback avec localStorage
export const saveRequest = async (data) => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('requests')
        .insert([data])
      if (error) throw error
      return data.id
    } catch (error) {
      console.error('Erreur Supabase:', error)
      // Fallback localStorage
      localStorage.setItem(`request_${data.id}`, JSON.stringify(data))
      return data.id
    }
  } else {
    localStorage.setItem(`request_${data.id}`, JSON.stringify(data))
    return data.id
  }
}

export const getRequests = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erreur Supabase:', error)
      return loadFromLocalStorage()
    }
  } else {
    return loadFromLocalStorage()
  }
}

export const updateRequestStatus = async (id, status) => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
      if (error) throw error
    } catch (error) {
      console.error('Erreur Supabase:', error)
      // Fallback localStorage
      const request = JSON.parse(localStorage.getItem(`request_${id}`) || '{}')
      request.status = status
      request.updated_at = new Date().toISOString()
      localStorage.setItem(`request_${id}`, JSON.stringify(request))
    }
  } else {
    const request = JSON.parse(localStorage.getItem(`request_${id}`) || '{}')
    request.status = status
    request.updated_at = new Date().toISOString()
    localStorage.setItem(`request_${id}`, JSON.stringify(request))
  }
}

export const deleteRequest = async (id) => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('requests')
        .delete()
        .eq('id', id)
      if (error) throw error
    } catch (error) {
      console.error('Erreur Supabase:', error)
      localStorage.removeItem(`request_${id}`)
    }
  } else {
    localStorage.removeItem(`request_${id}`)
  }
}

function loadFromLocalStorage() {
  const allRequests = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('request_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key))
        allRequests.push(data)
      } catch (e) {
        console.error('Erreur parsing localStorage:', e)
      }
    }
  }
  return allRequests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}
