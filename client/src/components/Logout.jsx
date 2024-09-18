// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Make the POST request to log out
                await axios.post('http://localhost:5000/api/v1/users/logout', {}, { withCredentials: true });

                // Redirect to the home page or login page after successful logout
                navigate('/');
            } catch (error) {
                console.error('Logout error:', error);
                // Handle error (e.g., show an error message)
            }
        };

        performLogout();
    }, [navigate]);

    return <p>Logging out...</p>;
};

export default Logout;
