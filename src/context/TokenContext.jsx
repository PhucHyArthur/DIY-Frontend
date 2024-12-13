import React, { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null); // Giữ nguyên token
    const [responseData, setResponseData] = useState(null); // Thêm biến để lưu response

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedResponse = localStorage.getItem('authResponse');
        setToken(storedToken);
        setResponseData(JSON.parse(storedResponse));
    }, []);

    return (
        <TokenContext.Provider value={{ token, setToken, responseData, setResponseData }}>
            {children}
        </TokenContext.Provider>
    );
};
