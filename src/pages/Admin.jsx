import React, { useEffect, useState } from 'react'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Admin(){
  const { token, user } = useAuth()
  const nav = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name:'', description:'', price:'', image:'', category:'', stock:'' })

  useEffect(()=>{
    if (!user?.isAdmin){ nav('/'); return }
    (async ()=>{
      const res = await api.get('/products')
      setProducts(res.data)
    })()
  }, [user])

  const save = async (e)=>{
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) }
    const headers = { Authorization: `Bearer ${token}` }
    if (form._id){
      await api.put(`/products/${form._id}`, payload, { headers })
    } else {
      await api.post('/products', payload, { headers })
    }
    const res = await api.get('/products')
    setProducts(res.data)
    setForm({ name:'', description:'', price:'', image:'', category:'', stock:'' })
  }

  const edit = (p)=> setForm({ ...p })
  const del = async (id)=>{
    await api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    setProducts(products.filter(p=> p._id !== id))
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="card" style={{marginBottom:'1rem'}}>
        <h3>{form._id ? 'Edit Product' : 'Create Product'}</h3>
        <form onSubmit={save}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <input className="input" placeholder="Price (USD)" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
          <input className="input" placeholder="Image URL (/images/...)" value={form.image} onChange={e=>setForm({...form, image:e.target.value})} />
<input type="file" onChange={e=>setFile(e.target.files[0])} />
<button type="button" onClick={async ()=>{
  if (!file) return alert('Choose a file first')
  const fd = new FormData(); fd.append('image', file)
  const res = await api.post('/upload', fd, { headers: { Authorization: `Bearer ${token}` } })
  setForm({ ...form, image: res.data.url }); alert('Uploaded!')
}}>Upload to Cloudinary</button>

          <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
          <input className="input" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} />
          <button type="submit">{form._id ? 'Update' : 'Create'}</button>
        </form>
      </div>
      <div className="grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>₹{(p.price*85).toFixed(0)} • {p.category} • stock: {p.stock}</p>
            <div className="row" style={{justifyContent:'space-between'}}>
              <button onClick={()=>edit(p)}>Edit</button>
              <button onClick={()=>del(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
