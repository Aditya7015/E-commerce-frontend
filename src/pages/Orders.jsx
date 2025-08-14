import React, { useEffect, useState } from 'react'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Orders(){
  const { token } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    (async ()=>{
      const res = await api.get('/orders/mine', { headers: { Authorization: `Bearer ${token}` } })
      setOrders(res.data)
    })()
  }, [token])

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length===0 ? <p>No orders yet.</p> : (
        <div className="grid">
          {orders.map(o => (
            <div key={o._id} className="card">
              <p><strong>Order:</strong> {o._id.slice(-8)}</p>
              <p><strong>Status:</strong> <span className="badge">{o.status}</span></p>
              <ul>
                {o.items.map((i,idx)=> <li key={idx}>{i.name} × {i.qty}</li>)}
              </ul>
              <p><strong>Total:</strong> ₹{(o.amount*85).toFixed(0)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
