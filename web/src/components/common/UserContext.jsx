import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

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
    // You should also call your API to perform the logout operation
    // fetch('/api/logout', { method: 'POST', credentials: 'include' });
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
