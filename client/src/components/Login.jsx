import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null); // For handling login errors
    const navigate = useNavigate(); // Replaces useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Attempt login
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password, role });
            localStorage.setItem('token', data.token);

            // Role-based navigation
            if (data.role === 'admin') {
                navigate('/admin/dashboard'); // Navigate to admin dashboard
            } else {
                navigate('/user/dashboard'); // Navigate to user dashboard
            }
        } catch (error) {
            // Set error message if login fails
            setError(error.response ? error.response.data.message : 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if login fails */}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
