import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PriceSummary from '../components/PriceSummary'
import { getDeliveryZones } from '../services/api'
import { useCart } from '../store/cartContext'
import { formatCurrency } from '../utils/formatCurrency'

export default function Cart() {
  const { cart, updateQuantity, removeItem, setDeliveryZone } = useCart()
  const [zones, setZones] = useState([])

  useEffect(() => {
    getDeliveryZones().then(setZones)
  }, [])

  const subtotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.priceXof * item.quantity, 0),
    [cart.items]
  )

  const deliveryFee = zones.find((z) => z.name === cart.deliveryZone)?.feeXof || 0
  const total = subtotal + deliveryFee

  if (cart.items.length === 0) {
    return (
      <div className="page-wrap pt-24 pb-16">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p className="text-slate-600 mb-4">Ajoutez des bouteilles pour commencer votre commande.</p>
          <Link to="/catalogue" className="btn-primary">Voir le catalogue</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrap pt-24 pb-16 grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold">Panier</h1>
        {cart.items.map((item) => (
          <div key={item.id} className="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-slate-500">{item.brand}</p>
              <h3 className="text-lg font-bold">Bouteille {item.sizeKg} kg</h3>
              <p className="text-sm text-slate-600">{formatCurrency(item.priceXof)}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 rounded-lg border border-slate-200"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                className="px-3 py-1 rounded-lg border border-slate-200"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="text-sm text-rose-600"
                onClick={() => removeItem(item.id)}
              >
                Retirer
              </button>
            </div>
          </div>
        ))}
        <div className="card p-5">
          <label className="text-sm font-semibold">Zone de livraison</label>
          <select
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
            value={cart.deliveryZone}
            onChange={(e) => setDeliveryZone(e.target.value)}
          >
            {zones.map((zone) => (
              <option key={zone.name} value={zone.name}>
                {zone.name} ({formatCurrency(zone.feeXof)})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <PriceSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
        <Link to="/commande" className="btn-primary w-full">Commander</Link>
      </div>
    </div>
  )
}
