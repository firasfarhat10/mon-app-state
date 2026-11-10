# TechStore – État global avec useContext et Redux Toolkit

TP de la séance 6 du module MERN Stack – École Polytechnique de Sousse (2026-2027).
Auteur : Firas Farhat

Application de commerce électronique qui combine deux techniques de gestion d'état :

- **useContext** pour un état léger : le thème clair / sombre, persistant dans le `localStorage` ;
- **Redux Toolkit** pour l'état métier : le panier (`createSlice`, `configureStore`, `useSelector`, `useDispatch`).

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:5173. Prérequis : Node.js 20.19 ou plus récent.

## Organisation

```
src/
├── main.jsx                 Provider Redux + ThemeProvider
├── App.jsx                  mise en page, aucune prop transmise
├── index.css                thèmes clair et sombre (variables CSS)
├── context/ThemeContext.jsx createContext, ThemeProvider, hook useTheme
├── redux/store.js           configureStore
├── redux/cartSlice.js       panier : addItem, removeItem, clearCart, applyPromoCode
└── components/
    ├── Navbar.jsx           bouton de thème + badge (useSelector ciblé)
    ├── ProductList.jsx      catalogue
    ├── ProductCard.jsx      carte produit, gestion du stock
    └── Cart.jsx             quantités, code promo, totaux
```

## Défis réalisés

1. **Panier persistant** : articles sauvegardés dans le `localStorage` (clé `techstore_cart`), totaux recalculés au démarrage.
2. **Code promo** : `POLY2027` applique 20 % de remise, recalculée à chaque modification du panier.
3. **Stock** : 3 exemplaires maximum par produit ; bouton « Rupture de Stock » désactivé, règle également appliquée dans le reducer.
