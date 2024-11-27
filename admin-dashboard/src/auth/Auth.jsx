import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    } else {
      const defaultUser = { role: 'user' }; // Set a default role if no user is found
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  }, [navigate]);

  const switchRole = (role) => {
    const updatedUser = { ...user, role };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const login = (username, role) => {
    const user = { username, role };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    if (role === 'admin') {
      navigate('/home');
    } else {
      navigate('/matches/league');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    const defaultUser = { role: 'user' }; // Reset to default role on logout
    setUser(defaultUser);
    localStorage.setItem('user', JSON.stringify(defaultUser));
    navigate('/matches/league');
  };

  return (
    <AuthContext.Provider value={{ user, switchRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
