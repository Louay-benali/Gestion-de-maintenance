import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount and get user info
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
          // Set default authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          try {
            // Try to get user profile from API
            const response = await axios.get('http://localhost:3001/auth/profile');
            if (response.data && response.data.utilisateur) {
              setUser(response.data.utilisateur);
              return;
            }
          } catch (profileError) {
            console.warn("Could not fetch profile, falling back to token data:", profileError);
          }
          
          // Fallback: decode JWT to get basic user info
          try {
            const payload = accessToken.split('.')[1];
            const decoded = atob(payload);
            const userData = JSON.parse(decoded);
            
            if (userData && userData.id) {
              setUser({
                id: userData.id,
                nom: userData.nom || '',
                prenom: userData.prenom || '',
                email: userData.email || '',
                role: userData.role || ''
              });
            }
          } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            logout();
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = (userData, tokens) => {
    // Set user in state
    setUser(userData);
    
    // Set tokens in cookies
    if (tokens) {
      // Set cookies with longer expiration (7 days)
      const options = { expires: 7 };
      Cookies.set("accessToken", tokens.accessToken.token, options);
      Cookies.set("refreshToken", tokens.refreshToken.token, options);
      
      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken.token}`;
    }
  };

  const logout = () => {
    // Clear user state
    setUser(null);
    
    // Remove cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  // Check if user is authenticated
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context more easily
export const useAuth = () => useContext(AuthContext);