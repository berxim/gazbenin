import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import { getProducts } from '../services/api'
import { useCart } from '../store/cartContext'
import { useToast } from '../components/Toast'

export default function Catalogue() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ brand: '', size: '', inStock: false })
  const [sort, setSort] = useState('price-asc')
  const { addItem } = useCart()
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setError('')
      } catch (err) {
        setError('Impossible de charger le catalogue.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products])
  const sizes = useMemo(
    () => [...new Set(products.map((p) => p.sizeKg))].sort((a, b) => a - b),
    [products]
  )

  const filtered = useMemo(() => {
    let items = [...products]
    if (filters.brand) items = items.filter((p) => p.brand === filters.brand)
    if (filters.size) items = items.filter((p) => String(p.sizeKg) === String(filters.size))
    if (filters.inStock) items = items.filter((p) => p.stockStatus !== 'rupture')
    items.sort((a, b) => (sort === 'price-asc' ? a.priceXof - b.priceXof : b.priceXof - a.priceXof))
    return items
  }, [products, filters, sort])

  return (
    <div className="page-wrap pt-24 pb-16 space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold">Catalogue</h1>
          <p className="text-slate-600">Choisissez votre marque et votre format.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <Filters
          brands={brands}
          sizes={sizes}
          filters={filters}
          onChange={setFilters}
          sort={sort}
          onSortChange={setSort}
        />

        <div className="space-y-4">
          {loading && <div className="card p-6">Chargement du catalogue...</div>}
          {error && <div className="card p-6 text-rose-600">{error}</div>}
          {!loading && !error && filtered.length === 0 && (
            <div className="card p-6">Aucun produit ne correspond aux filtres.</div>
          )}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={(item) => {
                  addItem(item)
                  toast.push('Produit ajouté au panier', 'success')
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
