import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OpeningHours from '../components/OpeningHours'
import DeliveryZones from '../components/DeliveryZones'
import { getDeliveryZones, getOpeningHours } from '../services/api'

export default function Home() {
  const [hours, setHours] = useState(null)
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [hoursData, zonesData] = await Promise.all([
        getOpeningHours(),
        getDeliveryZones()
      ])
      setHours(hoursData)
      setZones(zonesData)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="space-y-16">
      <section className="pt-24">
        <div className="page-wrap grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="uppercase tracking-widest text-xs text-primary font-semibold">Gaz domestique</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark">
              Gaz domestique livré chez vous au Bénin
            </h1>
            <p className="text-slate-600 text-lg">
              Commande rapide, livraison fiable et paiement Mobile Money. Profitez d'un service pensé pour votre quotidien.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogue" className="btn-primary">Commander maintenant</Link>
              <Link to="/catalogue" className="btn-outline">Voir les tarifs</Link>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="badge bg-emerald-100 text-emerald-700">Sécurité garantie</span>
              <span className="badge bg-amber-100 text-amber-700">Livraison rapide</span>
              <span className="badge bg-blue-100 text-blue-700">Prix transparents</span>
            </div>
          </div>
          <div className="card p-6 bg-gradient-to-br from-emerald-50 to-white">
            <h2 className="text-xl font-bold mb-4">Pourquoi choisir GazBénin ?</h2>
            <ul className="space-y-3 text-slate-700">
              <li>Commande en ligne en moins de 2 minutes</li>
              <li>Suivi clair de votre livraison</li>
              <li>Marques locales et internationales disponibles</li>
              <li>Service client WhatsApp réactif</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-wrap grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-2">Marques disponibles</h3>
          <p className="text-sm text-slate-600">Total, Oryx, SCP et autres marques populaires.</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-2">Livraison à domicile</h3>
          <p className="text-sm text-slate-600">Standard ou express selon votre urgence et votre zone.</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-2">Paiement sécurisé</h3>
          <p className="text-sm text-slate-600">MTN Mobile Money ou paiement à la livraison.</p>
        </div>
      </section>

      <section className="page-wrap grid md:grid-cols-2 gap-6">
        {loading ? (
          <div className="card p-6">Chargement des informations...</div>
        ) : (
          <>
            {hours && <OpeningHours hours={hours} />}
            <DeliveryZones zones={zones} />
          </>
        )}
      </section>

      <section className="page-wrap">
        <div className="card p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-dark text-white">
          <div>
            <h3 className="text-xl font-bold">Besoin d'aide ?</h3>
            <p className="text-sm text-white/80">Contactez-nous directement sur WhatsApp pour une réponse rapide.</p>
          </div>
          <a
            className="btn bg-white text-dark"
            href="https://wa.me/22900000000"
            target="_blank"
            rel="noreferrer"
          >
            Écrire sur WhatsApp
          </a>
        </div>
      </section>

      <section className="page-wrap grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-3">FAQ rapide</h3>
          <div className="space-y-3 text-sm text-slate-700">
            <p><strong>Quels sont les délais ?</strong> Standard 2-4h, Express 1h selon la zone.</p>
            <p><strong>Puis-je payer à la livraison ?</strong> Oui, choisissez l'option au checkout.</p>
            <p><strong>Quels formats ?</strong> 6kg, 12.5kg, 25kg et 50kg.</p>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-3">Zone de livraison</h3>
          <p className="text-sm text-slate-600">Cotonou, Calavi, Porto-Novo (exemples). Autres zones sur demande.</p>
        </div>
      </section>
    </div>
  )
}
