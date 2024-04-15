import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const AuthContext = createContext(null);

export const useUser = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setUser({
        id: decodedToken.id,
        first_name: decodedToken.first_name,
      });
    }
  }, []);

  const logIn = (accessToken, _user) => {
    setIsLoggedIn(true);
    Cookies.set('accessToken', accessToken, { expires: 1 })
    setUser(_user);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove('accessToken');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
