import React, { useEffect, useState } from 'react'
import OpeningHours from '../components/OpeningHours'
import { getOpeningHours } from '../services/api'
import { useToast } from '../components/Toast'

export default function Contact() {
  const [hours, setHours] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const toast = useToast()

  useEffect(() => {
    getOpeningHours().then(setHours)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    toast.push('Message envoyé (mock). Nous vous répondons vite !', 'success')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="page-wrap pt-24 pb-16 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Contact</h1>
        <p className="text-slate-600">Nous sommes disponibles pour vos demandes.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6 space-y-3">
          <p><strong>Adresse :</strong> Cotonou, Bénin</p>
          <p><strong>Téléphone :</strong> +229 00 00 00 00</p>
          <p><strong>WhatsApp :</strong> https://wa.me/22900000000</p>
          <p><strong>Email :</strong> contact@gazbenin.bj</p>
          {hours && <OpeningHours hours={hours} />}
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4">Envoyer un message</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Nom</label>
              <input
                className="rounded-lg border border-slate-200 px-3 py-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Email</label>
              <input
                className="rounded-lg border border-slate-200 px-3 py-2"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Message</label>
              <textarea
                className="rounded-lg border border-slate-200 px-3 py-2"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <button className="btn-primary" type="submit">Envoyer</button>
          </form>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold mb-3">Carte</h2>
        <div className="aspect-video w-full bg-slate-100 rounded-xl grid place-items-center text-slate-500">
          Iframe Google Maps (placeholder)
        </div>
      </div>
    </div>
  )
}
