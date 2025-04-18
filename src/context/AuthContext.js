import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Validate token on app load
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('tikangToken');
      if (!token) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL_GUEST}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Invalid or expired token');
        }

        const data = await res.json();
        setUser(data.user); // trusted user from backend
      } catch (err) {
        console.error('Auto-login failed:', err);
        localStorage.removeItem('tikangToken');
        setUser(null);
      }
    };

    validateToken();
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);

      if (decoded.full_name && decoded.email) {
        localStorage.setItem('tikangToken', token);
        setUser(decoded); // You can fetch `/me` again here if you want latest profile
      } else {
        throw new Error('Token missing required fields');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setUser(null);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('tikangToken');

    try {
      await fetch(`${process.env.REACT_APP_API_URL_GUEST}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('tikangToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
