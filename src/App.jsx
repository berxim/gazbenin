import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MomoPayment from './pages/MomoPayment'
import Confirmation from './pages/Confirmation'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { useCart } from './store/cartContext'

const RequireOrder = ({ children }) => {
  const { order } = useCart()
  if (!order) return <Navigate to="/panier" replace />
  return children
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/commande" element={<Checkout />} />
          <Route
            path="/paiement/momo"
            element={
              <RequireOrder>
                <MomoPayment />
              </RequireOrder>
            }
          />
          <Route
            path="/confirmation"
            element={
              <RequireOrder>
                <Confirmation />
              </RequireOrder>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
