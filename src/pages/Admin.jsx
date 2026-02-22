import React, { useEffect, useState } from 'react'
import { getProductOverrides, getProducts, saveProductOverrides } from '../services/api'
import { useToast } from '../components/Toast'

const stockOptions = [
  { value: 'en_stock', label: 'En stock' },
  { value: 'faible', label: 'Stock faible' },
  { value: 'rupture', label: 'Rupture' }
]

export default function Admin() {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState([])
  const [overrides, setOverrides] = useState({})
  const toast = useToast()

  useEffect(() => {
    if (authorized) {
      getProducts().then(setProducts)
      setOverrides(getProductOverrides())
    }
  }, [authorized])

  const handleLogin = (event) => {
    event.preventDefault()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
    if (!adminPassword) {
      toast.push('Mot de passe admin non configuré.', 'error')
      return
    }
    if (password === adminPassword) {
      setAuthorized(true)
    } else {
      toast.push('Mot de passe incorrect.', 'error')
    }
  }

  const handleUpdate = (id, field, value) => {
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }))
  }

  const handleSave = () => {
    saveProductOverrides(overrides)
    toast.push('Mises à jour enregistrées.', 'success')
  }

  if (!authorized) {
    return (
      <div className="page-wrap pt-24 pb-16 max-w-xl">
        <div className="card p-6">
          <h1 className="text-2xl font-extrabold mb-2">Admin</h1>
          <p className="text-sm text-slate-600 mb-4">Accès protégé par mot de passe.</p>
          <form className="space-y-3" onSubmit={handleLogin}>
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
            />
            <button className="btn-primary w-full" type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrap pt-24 pb-16 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Gestion des produits</h1>
        <button className="btn-primary" onClick={handleSave}>Enregistrer</button>
      </div>
      <div className="grid gap-4">
        {products.map((product) => {
          const override = overrides[product.id] || {}
          return (
            <div key={product.id} className="card p-5 grid sm:grid-cols-4 gap-3 items-center">
              <div>
                <p className="text-xs uppercase text-slate-500">{product.brand}</p>
                <p className="font-semibold">{product.sizeKg} kg</p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">Prix (XOF)</label>
                <input
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  type="number"
                  value={override.priceXof ?? product.priceXof}
                  onChange={(e) => handleUpdate(product.id, 'priceXof', Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">Stock</label>
                <select
                  className="rounded-lg border border-slate-200 px-3 py-2"
                  value={override.stockStatus ?? product.stockStatus}
                  onChange={(e) => handleUpdate(product.id, 'stockStatus', e.target.value)}
                >
                  {stockOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-slate-500">ID: {product.id}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
