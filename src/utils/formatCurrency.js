export const formatCurrency = (value) => {
  const number = Number(value || 0)
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0
  }).format(number)
}
