import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../store/cartContext'
import { formatCurrency } from '../utils/formatCurrency'

export default function Confirmation() {
  const { order } = useCart()

  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="page-wrap pt-24 pb-16 max-w-3xl">
      <div className="card p-6 space-y-4">
        <h1 className="text-2xl font-extrabold">Commande confirmée</h1>
        <p className="text-slate-600">Numéro de commande : <strong>{order.id}</strong></p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold">Client</p>
            <p className="text-sm text-slate-600">{order.customer.name}</p>
            <p className="text-sm text-slate-600">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Paiement</p>
            <p className="text-sm text-slate-600">
              {order.payment.method === 'momo' ? 'MTN MoMo' : 'À la livraison'} - {order.payment.status}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold mb-2">Résumé</p>
          <ul className="text-sm text-slate-600 space-y-1">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.brand} {item.sizeKg}kg
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Total</span>
          <span className="font-semibold">{formatCurrency(order.totals.total)}</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-outline">Suivre ma livraison (placeholder)</button>
          <Link to="/catalogue" className="btn-primary">Revenir au catalogue</Link>
        </div>
      </div>
    </div>
  )
}
