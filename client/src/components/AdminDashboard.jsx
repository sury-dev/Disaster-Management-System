import React, { useState } from 'react';
import AdminMap from '../components/AdminMap'; // Import the AdminMap component
import MapUpdater from '../components/MapUpdater';

const AdminDashboard = () => {
    const [markedZones, setMarkedZones] = useState([]);

    const handleZoneAdded = (zone) => {
        setMarkedZones([...markedZones, {
            center: [zone.latitude, zone.longitude],
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

            {/* Render the AdminMap and pass markedZones */}
            <AdminMap markedZones={markedZones} />

            {/* Render the MapUpdater */}
            <MapUpdater onZoneAdded={handleZoneAdded} />
        </div>
    );
};

export default AdminDashboard;
