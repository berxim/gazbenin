import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { createPaymentIntent, simulatePaymentConfirm } from '../services/momo'
import { useCart } from '../store/cartContext'
import { formatCurrency } from '../utils/formatCurrency'
import { useToast } from '../components/Toast'

export default function MomoPayment() {
  const { order, setOrder, clearCart } = useCart()
  const navigate = useNavigate()
  const toast = useToast()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('idle')
  const [paymentId, setPaymentId] = useState('')

  useEffect(() => {
    if (!order) return
    setPhone(order.customer?.phone || '')
  }, [order])

  if (!order) {
    return <Navigate to="/panier" replace />
  }

  const handleInit = async () => {
    setLoading(true)
    try {
      const response = await createPaymentIntent(order)
      setPaymentId(response.paymentId)
      setStatus(response.status)
      toast.push('Demande envoyée, confirmez sur votre téléphone.', 'success')
    } catch (err) {
      toast.push(err.message || 'Erreur de paiement.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      const response = await simulatePaymentConfirm(paymentId)
      if (response.status === 'SUCCESS') {
        const updated = {
          ...order,
          payment: { ...order.payment, status: 'SUCCESS' }
        }
        setOrder(updated)
        clearCart()
        navigate('/confirmation')
      } else {
        setOrder({ ...order, payment: { ...order.payment, status: 'FAILED' } })
        setStatus('FAILED')
        toast.push('Paiement refusé. Réessayez.', 'error')
      }
    } catch (err) {
      toast.push(err.message || 'Erreur de confirmation.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrap pt-24 pb-16 max-w-2xl">
      <div className="card p-6 space-y-4">
        <h1 className="text-2xl font-extrabold">Paiement MTN Mobile Money</h1>
        <p className="text-slate-600">Montant à payer : <strong>{formatCurrency(order.totals.total)}</strong></p>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Numéro MTN</label>
          <input
            className="rounded-lg border border-slate-200 px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={handleInit} disabled={loading}>
          Initier le paiement
        </button>
        {status === 'PENDING' && (
          <div className="card p-4 bg-amber-50 border-amber-200">
            <p className="text-sm text-amber-700">En attente de confirmation sur votre téléphone.</p>
            <button className="btn-outline mt-3" onClick={handleConfirm} disabled={loading}>
              J'ai confirmé sur mon téléphone
            </button>
          </div>
        )}
        {status === 'FAILED' && (
          <div className="card p-4 bg-rose-50 border-rose-200">
            <p className="text-sm text-rose-700">Paiement échoué. Veuillez réessayer.</p>
            <button className="btn-outline mt-3" onClick={handleInit} disabled={loading}>
              Réessayer
            </button>
          </div>
        )}
        <p className="text-xs text-slate-500">Note : Paiement réel MoMo nécessite un backend.</p>
      </div>
    </div>
  )
}
