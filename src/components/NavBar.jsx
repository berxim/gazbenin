import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../store/cartContext'
import MobileDrawer from './MobileDrawer'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold ${isActive ? 'text-primary' : 'text-slate-700 hover:text-primary'}`

export default function NavBar() {
  const { cart } = useCart()
  const [open, setOpen] = useState(false)
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="page-wrap h-16 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-lg text-primary">
            GazBénin
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/catalogue" className={navLinkClass}>Catalogue</NavLink>
            <NavLink to="/" className={navLinkClass}>Horaires</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/panier" className="relative">
              <span className="text-sm font-semibold text-slate-700 hover:text-primary">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 rounded-full bg-accent text-white text-xs w-5 h-5 grid place-items-center">
                  {totalItems}
                </span>
              )}
            </NavLink>
          </nav>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm"
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>
      <MobileDrawer open={open} onClose={() => setOpen(false)} totalItems={totalItems} />
    </>
  )
}
