import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

// ✅ Protected Route Component
const ProtectedRoute = () => {

    // ✅ Check if user is logged in (by checking JWT in localStorage or cookie)
    const isAuthenticated = (loginUser) => {
        return loginUser?.username !== undefined; // Check if token exists
    };
  
    const { loginUser, isLoading } = useSelector(state => state.usersReducer);
    const [isAccessible, setIsAccessible] = useState(false);
  
    useEffect(() => {
        setIsAccessible(isAuthenticated({...loginUser}))
    }, [isLoading]);

    if(!isLoading && !isAccessible && !loginUser?.username) {
        return <Navigate to="/login" />;
    }

    return isAccessible ? <Outlet /> : null;
};

export default ProtectedRoute;
