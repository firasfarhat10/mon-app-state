import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectQuantityById } from '../redux/cartSlice';

// Défi 3 : chaque carte lit SA quantité dans le store et la compare au stock
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const quantityInCart = useSelector(selectQuantityById(product.id));
  const isOutOfStock = quantityInCart >= product.stock;

  return (
    <div className="product-card">
      <div className="card-top">
        <span className="product-icon">{product.icon}</span>
        <span className="product-category">{product.category}</span>
      </div>
      <h4 className="product-title">{product.name}</h4>
      <p className="product-stock">
        Stock : {product.stock - quantityInCart} / {product.stock}
      </p>
      <div className="card-bottom">
        <span className="product-price">{product.price} DT</span>
        <button
          className="btn btn-add"
          onClick={() => dispatch(addItem(product))}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Rupture de Stock' : '+ Ajouter'}
        </button>
      </div>
    </div>
  );
}
