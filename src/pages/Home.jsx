import React, { useEffect, useState } from 'react'
import api from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(()=>{
    const load = async () => {
      const res = await api.get('/products')
      setProducts(res.data); setLoading(false)
    }
    load()
  }, [])

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', marginBottom:'1rem'}}>
        <h2>Featured Products</h2>
        <input className="input" placeholder="Search by name or category..." value={query} onChange={e=>setQuery(e.target.value)} style={{maxWidth: 320}} />
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="grid">
          {filtered.map(p => <ProductCard key={p._id} p={p} />)}
        </div>
      )}
    </div>
  )
}
