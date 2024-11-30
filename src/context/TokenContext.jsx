import React, { createContext, useContext, useState, useEffect } from 'react';
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState("");
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setToken(token);
        }
    }, []); 

    return (
        <TokenContext.Provider value={[token, setToken]}>
            {children }
        </TokenContext.Provider>
    );
};

