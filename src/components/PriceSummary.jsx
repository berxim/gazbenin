import React from 'react'
import { formatCurrency } from '../utils/formatCurrency'

export default function PriceSummary({ subtotal, deliveryFee, total }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between text-sm">
        <span>Sous-total</span>
        <span className="font-semibold">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>Livraison</span>
        <span className="font-semibold">{formatCurrency(deliveryFee)}</span>
      </div>
      <div className="h-px bg-slate-100" />
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">Total</span>
        <span className="text-lg font-extrabold text-primary">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}
