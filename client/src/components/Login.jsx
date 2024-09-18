import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

export default function Login() {
    const [isLogin, setIslogin] = useState(true); // Toggle between login and signup
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [name, setName] = useState(''); // State for name input (Signup only)
    const [phone, setPhone] = useState(''); // State for phone input (Signup only)
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming password (Signup only)
    const [error, setError] = useState(''); // State for error handling
    const navigate = useNavigate(); // For navigation after login/signup

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submit
        setError(''); // Reset error message

        // Basic validation for login
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/users/login',
                { email, password },
                { withCredentials: true } // Send cookies like JWT
            );
            if (response.status === 200) {
                navigate('/dashboard'); // Redirect to dashboard on successful login
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submit
        setError(''); // Reset error message

        // Basic validation for signup
        if (!name || !email || !password || !confirmPassword || !phone) {
            setError('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/signup',
                { name, email, password, phone },
                { withCredentials: true }
            );
            if (response.status === 201) { // Redirect based on successful signup
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Signup failed. Try again.');
        }
    };

    return (
        <div className="bod">
            <div className='container'>
            <div className='form-container'>
                <div className='form-toggle'>
                    <button className={isLogin ? 'active' : ''} onClick={() => setIslogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIslogin(false)}>SignUp</button>
                </div>
                
                {isLogin ? (
                    <div className='form'>
                        <h2>Login Form</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a href="#">Forgot Password?</a>
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit">Login</button>
                        </form>
                        <p>Not a member? <a onClick={() => setIslogin(false)}>Signup Now</a></p>
                    </div>
                ) : (
                    <div className='form'>
                        <h2>Signup Form</h2>
                        <form onSubmit={handleSignup}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Phone No."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {error && <p className="error-message">{error}</p>}
                            <button type="submit">SignUp</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}
