import React, { useState } from "react";
import axios from "axios";
import "./CampLoginRegister.css";
import { useNavigate } from 'react-router-dom';

const CampLoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        capacity: "",
        campManagerName: "",
        campManagerContact: "",
    });
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            name: "",
            email: "",
            password: "",
            address: "",
            capacity: "",
            campManagerName: "",
            campManagerContact: "",
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const route = isLogin ? "http://localhost:5000/api/v1/camp/login" : "http://localhost:5000/api/v1/camp/register";
            const response = await axios.post(route, formData, { withCredentials: true });
    
            // Store email in localStorage
            if (isLogin) {
                localStorage.setItem('campEmail', formData.email);
            }
    
            navigate('/camp-dashboard');
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };
    

    return (
        <div className="camp-container-camp">
            <div className="form-container-camp">
                <h2>{isLogin ? "Camp Login" : "Camp Registration"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Camp Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Camp Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="capacity"
                                placeholder="Camp Capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="campManagerName"
                                placeholder="Camp Manager Name"
                                value={formData.campManagerName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="campManagerContact"
                                placeholder="Camp Manager Contact"
                                value={formData.campManagerContact}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="submit-btn-camp">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <p className="toggle-link-camp" onClick={toggleForm}>
                    {isLogin ? "Don't have an account? Register" : "Already registered? Login"}
                </p>
            </div>
        </div>
    );
};

export default CampLoginRegister;
