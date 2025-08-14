import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Header(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <div className="row" style={{justifyContent:'space-between', width:'100%'}}>
      <div className="brand">
        <div className="brand-badge"></div>
        <Link to="/"><span>Gadzet Shop</span></Link>
        <span className="badge">MERN</span>
      </div>
      <nav className="nav">
        <Link className="button" to="/">Products</Link>
        <a className="button" href="/cart">Cart</a>
        {user ? (
          <>
            <Link className="button" to="/profile">Hi, {user.name.split(' ')[0]}</Link>
            {user.isAdmin && <Link className="button" to="/admin">Admin</Link>}
            <button className="button" onClick={()=>{ logout(); nav('/'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link className="button" to="/login">Login</Link>
            <Link className="button" to="/signup">Sign up</Link>
          </>
        )}
      </nav>
    </div>
  )
}
