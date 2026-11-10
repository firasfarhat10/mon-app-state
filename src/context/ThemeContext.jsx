import { createContext, useState, useContext, useEffect } from 'react';

// 1. Création de l'objet Contexte (en dehors de tout composant)
export const ThemeContext = createContext(null);

// 2. Fournisseur : détient l'état du thème et le diffuse à tous ses descendants
export function ThemeProvider({ children }) {
  // Initialisation paresseuse : lue une seule fois dans le localStorage
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'light');

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    // Applique le thème à la page : le CSS lit l'attribut data-theme sur <html>
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Hook personnalisé : consommation simple et sécurisée
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit etre utilise au sein d un ThemeProvider');
  }
  return context;
}
