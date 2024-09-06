import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

const Signup = () => {
    const [name, setName] = useState(''); // Add state for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // State for role (user or admin)
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, role });
            localStorage.setItem('token', data.token);
            if (role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Handling name input
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Handling email input
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Handling password input
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}> {/* Role select dropdown */}
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if signup fails */}
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;