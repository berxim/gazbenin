export const isValidBeninPhone = (value) => {
  if (!value) return false
  const cleaned = value.replace(/\s+/g, '')
  return /^(\+229)?\d{8}$/.test(cleaned)
}

export const required = (value) => String(value || '').trim().length > 0
