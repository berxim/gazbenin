import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PriceSummary from '../components/PriceSummary'
import { getDeliveryZones } from '../services/api'
import { useCart } from '../store/cartContext'
import { formatCurrency } from '../utils/formatCurrency'
import { isValidBeninPhone, required } from '../utils/validators'
import { useToast } from '../components/Toast'

const deliveryTypes = {
  standard: { label: 'Standard (2-4h)', fee: 0 },
  express: { label: 'Express (1h)', fee: 1500 }
}

export default function Checkout() {
  const { cart, setOrder, setDeliveryType, clearCart } = useCart()
  const navigate = useNavigate()
  const toast = useToast()
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    commune: cart.deliveryZone || 'Cotonou',
    landmark: '',
    timeSlot: '',
    notes: '',
    payment: 'momo',
    deliveryType: cart.deliveryType || 'standard'
  })

  useEffect(() => {
    getDeliveryZones().then((data) => {
      setZones(data)
      setLoading(false)
    })
  }, [])

  const subtotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.priceXof * item.quantity, 0),
    [cart.items]
  )

  const zoneFee = zones.find((z) => z.name === form.commune)?.feeXof || 0
  const deliveryFee = zoneFee + deliveryTypes[form.deliveryType].fee
  const total = subtotal + deliveryFee

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'deliveryType') {
      setDeliveryType(value)
    }
  }

  const validate = () => {
    if (!required(form.name)) return 'Nom requis.'
    if (!isValidBeninPhone(form.phone)) return 'Numéro de téléphone invalide.'
    if (!required(form.address)) return 'Adresse requise.'
    if (!required(form.commune)) return 'Commune requise.'
    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const error = validate()
    if (error) {
      toast.push(error, 'error')
      return
    }

    const orderPayload = {
      id: `GB-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cart.items,
      customer: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        commune: form.commune,
        landmark: form.landmark,
        timeSlot: form.timeSlot,
        notes: form.notes
      },
      delivery: {
        zone: form.commune,
        type: form.deliveryType,
        fee: deliveryFee
      },
      payment: {
        method: form.payment,
        status: form.payment === 'momo' ? 'PENDING' : 'CASH'
      },
      totals: {
        subtotal,
        deliveryFee,
        total
      }
    }

    setOrder(orderPayload)

    if (form.payment === 'momo') {
      navigate('/paiement/momo')
    } else {
      clearCart()
      navigate('/confirmation')
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="page-wrap pt-24 pb-16">
        <div className="card p-6 text-center">Votre panier est vide.</div>
      </div>
    )
  }

  return (
    <div className="page-wrap pt-24 pb-16 grid lg:grid-cols-[1fr_320px] gap-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-extrabold">Commande</h1>
        <div className="card p-5 grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Nom complet</label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Awa K."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Téléphone (MTN)</label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+229 01 00 00 00"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold">Adresse</label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Rue, maison, immeuble"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Commune / quartier</label>
            <select
              className="rounded-lg border border-slate-200 px-3 py-2"
              value={form.commune}
              onChange={(e) => handleChange('commune', e.target.value)}
            >
              {zones.map((zone) => (
                <option key={zone.name} value={zone.name}>{zone.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Repère</label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2"
              value={form.landmark}
              onChange={(e) => handleChange('landmark', e.target.value)}
              placeholder="Près de..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Créneau souhaité</label>
            <input
              className="rounded-lg border border-slate-200 px-3 py-2"
              value={form.timeSlot}
              onChange={(e) => handleChange('timeSlot', e.target.value)}
              placeholder="Ex: 14h-16h"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold">Notes pour le livreur</label>
            <textarea
              className="rounded-lg border border-slate-200 px-3 py-2"
              rows="3"
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
        </div>

        <div className="card p-5 space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">Type de livraison</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(deliveryTypes).map(([key, info]) => (
                <label key={key} className="flex items-center gap-2 border rounded-lg px-3 py-2">
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={form.deliveryType === key}
                    onChange={() => handleChange('deliveryType', key)}
                  />
                  <span>{info.label} (+{formatCurrency(info.fee)})</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Paiement</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === 'momo'}
                  onChange={() => handleChange('payment', 'momo')}
                />
                <span>MTN Mobile Money</span>
              </label>
              <label className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === 'cash'}
                  onChange={() => handleChange('payment', 'cash')}
                />
                <span>Paiement à la livraison</span>
              </label>
            </div>
          </div>
        </div>

        <button className="btn-primary w-full" type="submit" disabled={loading}>
          {form.payment === 'momo' ? 'Payer' : 'Valider la commande'}
        </button>
        <p className="text-xs text-slate-500">
          Note : Paiement réel MoMo nécessite un backend.
        </p>
      </form>

      <div className="space-y-4">
        <PriceSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
        <div className="card p-5">
          <h3 className="text-sm font-semibold mb-2">Récapitulatif</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            {cart.items.map((item) => (
              <li key={item.id}>
                {item.quantity}x {item.brand} {item.sizeKg}kg
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
