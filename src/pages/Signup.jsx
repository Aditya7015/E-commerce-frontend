import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup(){
  const { register } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      await register(name, email, password)
      nav('/')
    }catch(e){
      setErr(e.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="card" style={{maxWidth: 420, margin:'2rem auto'}}>
      <h2>Create Account</h2>
      <form onSubmit={onSubmit}>
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p style={{color:'#ffb4b4'}}>{err}</p>}
        <button type="submit">Sign up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  )
}
