import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = ({ Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Make a request to check the auth status
                await axios.post('http://localhost:5000/api/v1/users/verify-token', {}, { withCredentials: true });
                setIsAuthenticated(true);  // User is authenticated
            } catch (err) {
                setIsAuthenticated(false); // User is not authenticated
            }
        };

        checkAuth();
    }, []); // Dependency on location.pathname ensures it runs on route change

    if (isAuthenticated === null) {
        return <p>Loading...</p>; // You can replace this with a loading spinner if needed
    }

    // If authenticated, render the component. Otherwise, redirect to login
    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
