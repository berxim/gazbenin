import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const navClass = ({ isActive }) =>
  `block py-2 text-base font-semibold ${isActive ? 'text-primary' : 'text-slate-700'}`

export default function MobileDrawer({ open, onClose, totalItems }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div className="absolute top-0 right-0 h-full w-72 bg-white p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="font-extrabold text-lg text-primary" onClick={onClose}>
            GazBénin
          </Link>
          <button onClick={onClose} className="text-sm text-slate-500">Fermer</button>
        </div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/catalogue" className={navClass} onClick={onClose}>Catalogue</NavLink>
          <NavLink to="/" className={navClass} onClick={onClose}>Horaires</NavLink>
          <NavLink to="/contact" className={navClass} onClick={onClose}>Contact</NavLink>
          <NavLink to="/panier" className={navClass} onClick={onClose}>
            Panier {totalItems > 0 && `(${totalItems})`}
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
