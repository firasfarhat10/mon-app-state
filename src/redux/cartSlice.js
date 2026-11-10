import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'techstore_cart';
const PROMO_CODES = { POLY2027: 20 }; // code -> pourcentage de remise

// Défi 1 : lecture du panier sauvegardé (protégée contre une valeur corrompue)
const loadItems = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const items = saved ? JSON.parse(saved) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
};

const round2 = (x) => Math.round(x * 100) / 100;

// Recalcule tous les champs dérivés à partir de items et discountPercent
const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  state.discountAmount = round2((state.totalPrice * state.discountPercent) / 100);
  state.finalPrice = round2(state.totalPrice - state.discountAmount);
};

// Défi 1 : sauvegarde après chaque modification
const saveItems = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
};

// État initial : les totaux sont calculés à partir des articles restaurés
// (sinon le badge afficherait 0 après F5 alors que le panier contient des articles)
const initialState = {
  items: loadItems(),
  totalCount: 0,
  totalPrice: 0,
  discountPercent: 0, // Défi 2
  discountAmount: 0,
  finalPrice: 0,
  promoCode: '',
  promoError: ''
};
recalculateTotals(initialState);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Ajoute un article, ou augmente sa quantité, sans dépasser le stock (Défi 3)
    addItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        if (existing.stock !== undefined && existing.quantity >= existing.stock) return; // stock atteint
        existing.quantity += 1; // "mutation" autorisée grâce à Immer
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      recalculateTotals(state);
      saveItems(state);
    },

    // Diminue la quantité, ou retire l'article s'il tombe à zéro
    removeItem: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (!existing) return;
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      recalculateTotals(state);
      saveItems(state);
    },

    // Vide le panier et annule le code promo
    clearCart: (state) => {
      state.items = [];
      state.discountPercent = 0;
      state.promoCode = '';
      state.promoError = '';
      recalculateTotals(state);
      saveItems(state);
    },

    // Défi 2 : applique un code promo (insensible à la casse et aux espaces)
    applyPromoCode: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (PROMO_CODES[code]) {
        state.discountPercent = PROMO_CODES[code];
        state.promoCode = code;
        state.promoError = '';
      } else {
        state.discountPercent = 0;
        state.promoCode = '';
        state.promoError = 'Code promo invalide';
      }
      recalculateTotals(state);
    }
  }
});

export const { addItem, removeItem, clearCart, applyPromoCode } = cartSlice.actions;

// Sélecteur réutilisable : quantité d'un produit dans le panier (0 s'il n'y est pas)
export const selectQuantityById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id)?.quantity ?? 0;

export default cartSlice.reducer;
