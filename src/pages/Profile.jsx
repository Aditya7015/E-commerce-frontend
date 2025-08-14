import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile(){
  const { user } = useAuth()
  const [cart, setCart] = useState([])

  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0)

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <div className="card" style={{marginTop:'1rem'}}>
        <h3>Your Cart</h3>
        {cart.length === 0 ? <p>No items yet.</p> : (
          <ul>
            {cart.map(i => (
              <li key={i._id} className="row" style={{justifyContent:'space-between'}}>
                <span>{i.name} × {i.qty}</span>
                <span>₹{(i.price*85*i.qty).toFixed(0)}</span>
              </li>
            ))}
          </ul>
        )}
        <hr style={{borderColor:'#2a3258'}} />
        <p><strong>Total:</strong> ₹{(total*85).toFixed(0)}</p>
        <button onClick={()=> alert('Checkout placeholder – integrate payment gateway later')}>Checkout</button>
      </div>
    </div>
  )
}
