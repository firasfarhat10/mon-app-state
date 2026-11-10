import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  // État léger : le thème, via le Contexte
  const { theme, toggleTheme } = useTheme();

  // État métier : sélection ciblée, la Navbar ne se re-rend que si totalCount change
  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="logo-icon">*</span>
        <h2>
          TechStore <span className="badge-mern">MERN S6</span>
        </h2>
      </div>

      <div className="nav-actions">
        <button className="btn-theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}
        </button>

        <div className="cart-badge">
          <span className="cart-icon">[Panier]</span>
          <span className="badge-count">{totalCount}</span>
        </div>
      </div>
    </nav>
  );
}
