import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api.js'

export default function ProductPage(){
  const { id } = useParams()
  const [p, setP] = useState(null)

  useEffect(()=>{
    const load = async () => {
      const res = await api.get(`/products/${id}`)
      setP(res.data)
    }
    load()
  }, [id])

  if (!p) return <p>Loading...</p>

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i._id === p._id)
    if (existing) existing.qty += 1
    else cart.push({ ...p, qty: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }

  return (
    <div className="row" style={{alignItems:'flex-start'}}>
      <img src={p.image} alt={p.name} style={{width: 360, height: 360, objectFit:'contain', borderRadius: 16, background: '#0d1330'}} />
      <div style={{flex:1}}>
        <h2>{p.name}</h2>
        <p className="price" style={{fontSize:'1.2rem'}}>₹{(p.price * 85).toFixed(0)}</p>
        <p>{p.description}</p>
        <p><span className="badge">{p.category}</span> <span className="badge">{p.stock} in stock</span></p>
        <div className="row">
          <button onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}
