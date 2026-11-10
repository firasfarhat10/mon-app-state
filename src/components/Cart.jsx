import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart, applyPromoCode } from '../redux/cartSlice';

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent, discountAmount, finalPrice, promoCode, promoError } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Défi 2 : le texte saisi est un état local (il ne concerne que ce composant)
  const [codeInput, setCodeInput] = useState('');

  const handleApply = (e) => {
    e.preventDefault(); // le formulaire ne recharge pas la page
    dispatch(applyPromoCode(codeInput));
  };

  return (
    <div className="cart-card">
      <div className="cart-header">
        <h3>Mon Panier Redux</h3>
        {items.length > 0 && (
          <button className="btn-clear" onClick={() => dispatch(clearCart())}>
            Vider
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Le panier est actuellement vide.</p>
          <span className="empty-subtext">Ajoutez un article pour observer la reactivite de Redux.</span>
        </div>
      ) : (
        <div className="cart-body">
          <div className="cart-items-container">
            {items.map((item) => (
              <div key={item.id} className="cart-row">
                <span className="cart-item-icon">{item.icon}</span>
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    {item.price} DT x {item.quantity} = <strong>{item.price * item.quantity} DT</strong>
                  </span>
                </div>
                <div className="cart-item-qty">
                  <button className="btn-qty" onClick={() => dispatch(removeItem(item.id))}>-</button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="btn-qty"
                    onClick={() => dispatch(addItem(item))}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form className="promo-form" onSubmit={handleApply}>
            <input
              type="text"
              placeholder="Code promo"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
            <button type="submit" className="btn btn-promo">Appliquer le Code</button>
          </form>
          {promoError && <p className="promo-error">{promoError}</p>}

          <div className="cart-total-box">
            <div className="total-row">
              <span>Nombre total d'articles :</span>
              <strong>{totalCount}</strong>
            </div>
            <div className="total-row">
              <span>Montant :</span>
              <strong className={discountPercent > 0 ? 'price-old' : ''}>{totalPrice} DT</strong>
            </div>
            {discountPercent > 0 && (
              <>
                <div className="total-row discount">
                  <span>Remise {promoCode} (-{discountPercent} %) :</span>
                  <strong>-{discountAmount} DT</strong>
                </div>
                <div className="total-row total-highlight discount">
                  <span>Total a payer :</span>
                  <strong className="total-amount">{finalPrice} DT</strong>
                </div>
              </>
            )}
            {discountPercent === 0 && (
              <div className="total-row total-highlight">
                <span>Montant Total :</span>
                <strong className="total-amount">{totalPrice} DT</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
