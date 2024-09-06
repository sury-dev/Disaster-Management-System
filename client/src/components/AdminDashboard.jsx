import React, { useState } from 'react';
import MapUpdater from '../components/MapUpdater';

const AdminDashboard = () => {
    const [markedZones, setMarkedZones] = useState([]);

    const handleZoneAdded = (zone) => {
        setMarkedZones([...markedZones, {
            center: L.latLng(zone.latitude, zone.longitude),
            radius: zone.radius,
            message: zone.message,
            riskLevel: zone.riskLevel,
            color: zone.color,
        }]);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard.</p>
            <MapUpdater onZoneAdded={handleZoneAdded} />
        </div>
    );
};

export default AdminDashboard;
