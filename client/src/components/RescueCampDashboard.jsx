import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RescueCampDashboard.css";

const RescueCampDashboard = () => {
    const [campData, setCampData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        capacity: "",
        currentOccupancy: "",
        water: "",
        food: "",
        medicalSupplies: "",
        blankets: "",
        tents: "",
    });

    useEffect(() => {
        const fetchCampData = async () => {
            try {
                const email = localStorage.getItem('campEmail');
                if (!email) {
                    throw new Error("No email found in localStorage.");
                }

                const response = await axios.get(`http://localhost:5000/api/v1/camp/getCamp?email=${email}`, { withCredentials: true });
                if (response.data && response.data.data) {
                    const data = response.data.data;
                    setCampData(data);
                    setFormData({
                        capacity: data.capacity || "",
                        currentOccupancy: data.currentOccupancy || "",
                        water: data.resources?.water || "",
                        food: data.resources?.food || "",
                        medicalSupplies: data.resources?.medicalSupplies || "",
                        blankets: data.resources?.blankets || "",
                        tents: data.resources?.tents || "",
                    });
                } else {
                    throw new Error("Invalid response structure.");
                }
            } catch (err) {
                console.error("Error fetching camp data:", err.message);
            }
        };

        fetchCampData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = localStorage.getItem('campEmail');
            if (!email) {
                throw new Error("No email found in localStorage.");
            }

            // Log formData to verify it contains all fields
            console.log("Form data to be sent:", formData);

            await axios.post(`http://localhost:5000/api/v1/camp/updateCamp?email=${email}`, formData, { withCredentials: true });

            setIsEditing(false);

            window.location.reload();
        } catch (err) {
            console.error("Error updating camp data:", err.message);
        }
    };

    return (
        <div className="rescue-camp-dashboard">
            <h2>Rescue Camp Dashboard</h2>
            {campData ? (
                <div>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <label>
                                Capacity:
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Current Occupancy:
                                <input
                                    type="number"
                                    name="currentOccupancy"
                                    value={formData.currentOccupancy}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Water:
                                <input
                                    type="number"
                                    name="water"
                                    value={formData.water}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Food:
                                <input
                                    type="number"
                                    name="food"
                                    value={formData.food}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Medical Supplies:
                                <input
                                    type="number"
                                    name="medicalSupplies"
                                    value={formData.medicalSupplies}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Blankets:
                                <input
                                    type="number"
                                    name="blankets"
                                    value={formData.blankets}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Tents:
                                <input
                                    type="number"
                                    name="tents"
                                    value={formData.tents}
                                    onChange={handleChange}
                                />
                            </label>
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <p>Capacity: {campData.capacity}</p>
                            <p>Current Occupancy: {campData.currentOccupancy}</p>
                            <p>Water: {campData?.water || "N/A"}</p>
                            <p>Food: {campData?.food || "N/A"}</p>
                            <p>Medical Supplies: {campData?.medicalSupplies || "N/A"}</p>
                            <p>Blankets: {campData?.blankets || "N/A"}</p>
                            <p>Tents: {campData?.tents || "N/A"}</p>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RescueCampDashboard;
