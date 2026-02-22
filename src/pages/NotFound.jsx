import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page-wrap pt-24 pb-16">
      <div className="card p-6 text-center">
        <h1 className="text-2xl font-bold">Page introuvable</h1>
        <p className="text-slate-600 mb-4">La page demandée n'existe pas.</p>
        <Link to="/" className="btn-primary">Retour accueil</Link>
      </div>
    </div>
  )
}
