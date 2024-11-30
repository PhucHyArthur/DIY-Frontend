import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Quản lý trạng thái người dùng chỉ trong frontend (không cần localStorage)
    const [userData, setUserData] = useState({
        user: null  // Không sử dụng localStorage, chỉ giữ dữ liệu trong trạng thái
    });

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
