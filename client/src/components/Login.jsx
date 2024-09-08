import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form'; // Import useForm from react-hook-form

const Login = () => {
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null); // For handling login errors
    const navigate = useNavigate();

    // Initialize useForm
    const {
        register, // To register input fields
        handleSubmit, // To handle form submit
        formState: { errors }, // To track validation errors
    } = useForm();

    // Function to handle form submission
    const onSubmit = async (data) => {
        try {
            // Attempt login
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: data.email,
                password: data.password,
                role,
            });
            localStorage.setItem('token', response.data.token);

            // Role-based navigation
            if (role === 'admin') {
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            
            <div>
                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email format',
                        },
                    })}
                />
                {/* Error message for email */}
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long',
                        },
                    })}
                />
                {/* Error message for password */}
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <div>
                {/* Role Dropdown */}
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* Display server-side error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Submit Button */}
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
