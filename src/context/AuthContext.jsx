import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api.js'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const bootstrap = async ()=>{
      try{
        if (token){
          const me = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
          setUser(me.data.user)
        }
      }catch(e){
        setUser(null); setToken(null); localStorage.removeItem('token')
      }finally{
        setLoading(false)
      }
    }
    bootstrap()
  },[])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    setUser(res.data.user); setToken(res.data.token)
    localStorage.setItem('token', res.data.token)
  }

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    setUser(res.data.user); setToken(res.data.token)
    localStorage.setItem('token', res.data.token)
  }

  const logout = async () => {
    try{ await api.post('/auth/logout') } catch(e){}
    setUser(null); setToken(null); localStorage.removeItem('token')
  }

  const value = { user, token, login, register, logout, loading }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
