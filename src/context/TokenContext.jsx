// src/context/TokenContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [userAccessToken, setUserAccessToken] = useState(() =>
    localStorage.getItem('spotify_user_access_token') || null
  );
  const [publicAccessToken, setPublicAccessToken] = useState(() =>
    localStorage.getItem('spotify_public_access_token') || null
  );

  useEffect(() => {
    if (userAccessToken) {
      localStorage.setItem('spotify_user_access_token', userAccessToken);
    }
  }, [userAccessToken]);

  useEffect(() => {
    if (publicAccessToken) {
      localStorage.setItem('spotify_public_access_token', publicAccessToken);
    }
  }, [publicAccessToken]);

  return (
    <TokenContext.Provider
      value={{
        userAccessToken,
        setUserAccessToken,
        publicAccessToken,
        setPublicAccessToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
