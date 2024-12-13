import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../../context/TokenContext'; // Import JwtContext

const PrivateRoute = ({ children }) => {
    const {token} = useContext(TokenContext);
    // const token = true
    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
