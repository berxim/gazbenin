import React from 'react'
import { formatCurrency } from '../utils/formatCurrency'

const stockMap = {
  en_stock: { label: 'En stock', className: 'bg-emerald-100 text-emerald-700' },
  faible: { label: 'Stock faible', className: 'bg-amber-100 text-amber-700' },
  rupture: { label: 'Rupture', className: 'bg-rose-100 text-rose-700' }
}

export default function ProductCard({ product, onAdd }) {
  const stock = stockMap[product.stockStatus]

  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{product.brand}</p>
          <h3 className="text-lg font-bold">Bouteille {product.sizeKg} kg</h3>
        </div>
        <span className={`badge ${stock?.className || 'bg-slate-100 text-slate-600'}`}>
          {stock?.label || 'Indisponible'}
        </span>
      </div>
      <div className="text-xl font-extrabold text-slate-900">{formatCurrency(product.priceXof)}</div>
      <button
        className="btn-primary"
        disabled={product.stockStatus === 'rupture'}
        onClick={() => onAdd(product)}
      >
        Ajouter au panier
      </button>
    </div>
  )
}
