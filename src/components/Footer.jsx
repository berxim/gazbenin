import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-white">
      <div className="page-wrap py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
        <div>
          <p className="font-bold text-slate-900">GazBénin</p>
          <p>Adresse : Cotonou, Bénin</p>
          <p>Téléphone : +229 00 00 00 00</p>
        </div>
        <div>
          <p className="font-bold text-slate-900">Horaires</p>
          <p>Lun - Sam : 08:00 - 19:00</p>
          <p>Dim : 09:00 - 14:00</p>
        </div>
        <div>
          <p className="font-bold text-slate-900">Réseaux</p>
          <p>WhatsApp : +229 00 00 00 00</p>
          <p>Facebook : @gazbenin</p>
        </div>
      </div>
    </footer>
  )
}
