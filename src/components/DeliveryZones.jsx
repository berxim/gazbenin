import React from 'react'
import { formatCurrency } from '../utils/formatCurrency'

export default function DeliveryZones({ zones }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold mb-3">Zones de livraison</h3>
      <div className="space-y-2 text-sm text-slate-700">
        {zones.map((zone) => (
          <div key={zone.name} className="flex items-center justify-between">
            <span>{zone.name}</span>
            <span className="font-semibold">{formatCurrency(zone.feeXof)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
