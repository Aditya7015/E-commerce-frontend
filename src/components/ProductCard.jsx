import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ p }){
  return (
    <div className="card">
      <Link to={`/product/${p._id}`}>
        <img src={p.image} alt={p.name} loading="lazy" />
        <h3>{p.name}</h3>
      </Link>
      <p style={{opacity:.85}}>{p.description}</p>
      <div className="row" style={{justifyContent:'space-between'}}>
        <span className="price">₹{(p.price * 85).toFixed(0)}</span>
        <Link className="button" to={`/product/${p._id}`}>View</Link>
      </div>
    </div>
  )
}
