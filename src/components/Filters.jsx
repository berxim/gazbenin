import React from 'react'

export default function Filters({ brands, sizes, filters, onChange, sort, onSortChange }) {
  return (
    <div className="card p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Marque</label>
        <select
          className="rounded-lg border border-slate-200 px-3 py-2"
          value={filters.brand}
          onChange={(e) => onChange({ ...filters, brand: e.target.value })}
        >
          <option value="">Toutes</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Taille</label>
        <select
          className="rounded-lg border border-slate-200 px-3 py-2"
          value={filters.size}
          onChange={(e) => onChange({ ...filters, size: e.target.value })}
        >
          <option value="">Toutes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>{size} kg</option>
          ))}
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="rounded border-slate-300"
          checked={filters.inStock}
          onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
        />
        En stock uniquement
      </label>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Tri</label>
        <select
          className="rounded-lg border border-slate-200 px-3 py-2"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>
      </div>
    </div>
  )
}
