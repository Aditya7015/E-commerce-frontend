import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const { user, token } = useAuth()
  const nav = useNavigate()
  const [cart, setCart] = useState(null)
  const auth = token ? { Authorization: `Bearer ${token}` } : {}

  const load = async ()=>{
    if (!token){ nav('/login'); return }
    const res = await api.get('/cart', { headers: auth })
    setCart(res.data)
  }

  useEffect(()=>{ load() }, [token])

  const add = async (productId)=>{
    const res = await api.post('/cart/add', { productId, qty: 1 }, { headers: auth })
    setCart(res.data)
  }
  const remove = async (productId)=>{
    const res = await api.post('/cart/remove', { productId }, { headers: auth })
    setCart(res.data)
  }
  const checkout = async ()=>{
    const res = await api.post('/orders', {}, { headers: auth })
    const order = res.data
    // mock pay immediately
    await api.post(`/orders/${order._id}/pay`, {}, { headers: auth })
    alert('Payment successful (mock). Order placed!')
    await load()
  }

  if (!cart) return <p>Loading...</p>
  const total = cart.items.reduce((s,i)=> s + i.price * i.qty, 0)

  return (
    <div className="card">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? <p>No items. <Link to="/">Go shopping</Link></p> : (
        <ul style={{listStyle:'none', padding:0, margin:0}}>
          {cart.items.map(i => (
            <li key={i.product} className="row" style={{justifyContent:'space-between', marginBottom: '.5rem'}}>
              <span>{i.name} × {i.qty}</span>
              <div className="row">
                <button onClick={()=>add(i.product)}>+</button>
                <button onClick={()=>remove(i.product)}>Remove</button>
                <span>₹{(i.price*85*i.qty).toFixed(0)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <hr style={{borderColor:'#2a3258'}} />
      <p><strong>Total:</strong> ₹{(total*85).toFixed(0)}</p>
      <div className="row">
        <button onClick={checkout} disabled={cart.items.length===0}>Checkout</button>
        <Link className="button" to="/orders">My Orders</Link>
      </div>
    </div>
  )
}
