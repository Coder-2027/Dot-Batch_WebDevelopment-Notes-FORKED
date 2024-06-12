import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn }) => {                        //automatically receives children class here children is dashboard...
    if (isLoggedIn) {
        return children;
    }
    else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoute
