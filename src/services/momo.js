const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const createPaymentIntent = async (order) => {
  await wait(800)
  if (!order) {
    throw new Error('Commande invalide.')
  }
  return {
    paymentId: `pay_${Date.now()}`,
    status: 'PENDING'
  }
}

export const simulatePaymentConfirm = async (paymentId) => {
  await wait(900)
  if (!paymentId) {
    throw new Error('Identifiant de paiement manquant.')
  }
  const success = Math.random() > 0.25
  return {
    paymentId,
    status: success ? 'SUCCESS' : 'FAILED'
  }
}
