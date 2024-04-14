import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Replace with your actual API call to check login status
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/check-login', { credentials: 'include' });
        const data = await response.json();
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    
    // checkLoginStatus();
    setIsLoggedIn(true);
    setUsername('ChihChao');
  }, []);

  const logIn = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername('');
    // You should also call your API to perform the logout operation
    // fetch('/api/logout', { method: 'POST', credentials: 'include' });
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
