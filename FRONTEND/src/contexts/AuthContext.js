import { createContext, useContext, useState } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Créer le provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // Tu peux aussi enregistrer les infos dans localStorage ici
  };

  const logout = () => {
    setUser(null);
    // Supprime les infos du localStorage ici
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte plus facilement
export const useAuth = () => useContext(AuthContext);
