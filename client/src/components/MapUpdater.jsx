// components/MapUpdater.jsx
import React, { useState } from 'react';
import axios from 'axios';

function MapUpdater({ onZoneAdded }) {
    const [testLat, setTestLat] = useState('');
    const [testLon, setTestLon] = useState('');
    const [zoneMessage, setZoneMessage] = useState('');
    const [zoneRiskLevel, setZoneRiskLevel] = useState('Low');
    const [zoneColor, setZoneColor] = useState('#0000ff');
    const [zoneRadius, setZoneRadius] = useState(1000);

    const markZone = () => {
        const lat = parseFloat(testLat);
        const lon = parseFloat(testLon);

        if (!isNaN(lat) && !isNaN(lon) && zoneMessage.trim()) {
            const newZone = {
                latitude: lat,
                longitude: lon,
                radius: zoneRadius,
                message: zoneMessage,
                riskLevel: zoneRiskLevel,
                color: zoneColor,
            };
            console.log(newZone);

            // Save the new zone to the backend
            axios.post('http://localhost:5000/api/mapzone/zones', newZone)
                .then((response) => {
                    // Notify parent component
                    onZoneAdded(response.data);
                    // Clear input fields
                    setZoneMessage('');
                    setZoneRiskLevel('Low');
                    setZoneColor('#0000ff');
                    setZoneRadius(1000);
                    setTestLat('');
                    setTestLon('');
                })
                .catch((error) => {
                    console.error('Error adding zone:', error);
                });
        } else {
            alert('Please enter valid latitude, longitude, and a message.');
        }
    };

    return (
        <div className="controls">
            <input
                type="text"
                placeholder="Latitude"
                value={testLat}
                onChange={(e) => setTestLat(e.target.value)}
            />
            <input
                type="text"
                placeholder="Longitude"
                value={testLon}
                onChange={(e) => setTestLon(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter a message for the zone"
                value={zoneMessage}
                onChange={(e) => setZoneMessage(e.target.value)}
            />
            <input
                type="text"
                placeholder="Risk Level (e.g., Low, Medium, High)"
                value={zoneRiskLevel}
                onChange={(e) => setZoneRiskLevel(e.target.value)}
            />
            <input
                type="color"
                value={zoneColor}
                onChange={(e) => setZoneColor(e.target.value)}
            />
            <input
                type="number"
                placeholder="Radius (meters)"
                value={zoneRadius}
                onChange={(e) => setZoneRadius(parseInt(e.target.value))}
            />
            <button onClick={markZone}>
                Mark Location with Message
            </button>
        </div>
    );
}

export default MapUpdater;
