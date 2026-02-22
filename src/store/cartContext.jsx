import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const CartContext = createContext(null)
const CART_KEY = 'gazbenin_cart'
const ORDER_KEY = 'gazbenin_order'

const initialState = {
  items: [],
  deliveryZone: 'Cotonou',
  deliveryType: 'standard'
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadFromStorage(CART_KEY, initialState))
  const [order, setOrder] = useState(() => loadFromStorage(ORDER_KEY, null))

  useEffect(() => {
    saveToStorage(CART_KEY, cart)
  }, [cart])

  useEffect(() => {
    saveToStorage(ORDER_KEY, order)
  }, [order])

  const addItem = (product) => {
    setCart((prev) => {
      const existing = prev.items.find((item) => item.id === product.id)
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
      }
      return {
        ...prev,
        items: [...prev.items, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id, quantity) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    }))
  }

  const removeItem = (id) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }))
  }

  const clearCart = () => setCart(initialState)

  const setDeliveryZone = (zone) => setCart((prev) => ({ ...prev, deliveryZone: zone }))
  const setDeliveryType = (type) => setCart((prev) => ({ ...prev, deliveryType: type }))

  const value = useMemo(
    () => ({
      cart,
      order,
      setOrder,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      setDeliveryZone,
      setDeliveryType
    }),
    [cart, order]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
