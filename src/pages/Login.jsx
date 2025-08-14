import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      await login(email, password)
      nav('/')
    }catch(e){
      setErr(e.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="card" style={{maxWidth: 420, margin:'2rem auto'}}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p style={{color:'#ffb4b4'}}>{err}</p>}
        <button type="submit">Login</button>
      </form>
      <p>New here? <Link to="/signup">Create an account</Link></p>
    </div>
  )
}
