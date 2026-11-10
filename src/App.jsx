import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

// App ne passe AUCUNE prop : chaque composant lit l'état global dont il a besoin
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="layout">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}
