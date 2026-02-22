import baseProducts from '../data/products.json'
import openingHours from '../data/openingHours.json'
import deliveryZones from '../data/deliveryZones.json'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const OVERRIDE_KEY = 'gazbenin_product_overrides'

export const getProducts = async () => {
  const overrides = loadFromStorage(OVERRIDE_KEY, {})
  const merged = baseProducts.map((product) => {
    const override = overrides[product.id]
    return override ? { ...product, ...override } : product
  })
  await new Promise((resolve) => setTimeout(resolve, 300))
  return merged
}

export const getOpeningHours = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return openingHours
}

export const getDeliveryZones = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return deliveryZones
}

export const saveProductOverrides = (updates) => {
  saveToStorage(OVERRIDE_KEY, updates)
}

export const getProductOverrides = () => loadFromStorage(OVERRIDE_KEY, {})
