import React from 'react'

export default function OpeningHours({ hours }) {
  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold mb-3">Horaires d'ouverture</h3>
      <div className="grid gap-2 text-sm text-slate-700">
        <div className="flex justify-between">
          <span>Lun - Sam</span>
          <span className="font-semibold">{hours.weekday}</span>
        </div>
        <div className="flex justify-between">
          <span>Dimanche</span>
          <span className="font-semibold">{hours.sunday}</span>
        </div>
      </div>
    </div>
  )
}
