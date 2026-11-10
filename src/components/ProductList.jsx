import ProductCard from './ProductCard';

// Défi 3 : chaque produit a un stock maximal
const PRODUCTS = [
  { id: 1, name: 'Ecran UltraWide 4K 34"', price: 850, category: 'Affichage', icon: '[Ecran]', stock: 3 },
  { id: 2, name: 'Clavier Mecanique RGB', price: 180, category: 'Peripherique', icon: '[Clavier]', stock: 3 },
  { id: 3, name: 'Souris Sans Fil Ergonomique', price: 95, category: 'Accessoire', icon: '[Souris]', stock: 3 },
  { id: 4, name: 'Casque Haute Fidelite ANC', price: 320, category: 'Audio', icon: '[Audio]', stock: 3 }
];

export default function ProductList() {
  return (
    <div className="product-section">
      <div className="section-title-box">
        <h3>Catalogue Produits</h3>
        <p className="subtitle-hint">Chaque clic declenche une action via dispatch(addItem(p)).</p>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
