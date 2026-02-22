# GazBénin (Frontend)

Site web responsive (mobile-first) pour la vente de gaz domestique au Bénin. Frontend React + Vite + TailwindCSS avec catalogue, panier, checkout et paiement MTN MoMo simulé.

## Prérequis
- Node.js installé (v18+ recommandé)

## Installation
```bash
npm install
```

## Lancer en local
```bash
npm run dev
```

## Build production
```bash
npm run build
```

## Structure
- `src/pages` : pages principales
- `src/components` : composants UI
- `src/data` : données locales (JSON)
- `src/services` : services mock API / MoMo
- `src/store` : gestion d'état (Context)
- `src/utils` : helpers

## Notes importantes
- Paiement réel MoMo nécessite un backend.
- Les données produits sont chargées depuis `src/data/products.json` et peuvent être surchargées localement via `/admin` (localStorage).

## Variables d'environnement
Copiez `.env.example` vers `.env` et adaptez si nécessaire.

## Points à connecter côté backend (API)
- `GET /products` -> liste des produits
- `GET /delivery-fees` -> zones + frais
- `POST /payments/momo/create` -> createPaymentIntent
- `POST /payments/momo/confirm` -> confirmPayment
- `POST /orders` -> création de commande

