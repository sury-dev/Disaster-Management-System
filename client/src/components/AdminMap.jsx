import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';

// Custom Icon for the live location markers
const customIcon = new L.Icon({
    iconUrl: 'https://imgs.search.brave.com/chhj0Pk_nGJR_zk68FQgvcf2RRS8lvMpuigijRV0zoY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudmV4ZWxzLmNv/bS9tZWRpYS91c2Vy/cy8zLzE1NDY1NS9p/c29sYXRlZC9wcmV2/aWV3LzcxZGNjYmIw/Nzc1OTdkZWE1NWRm/YzViN2E3YWY1MmM0/LWxvY2F0aW9uLXBp/bi1jb250YWN0LWlj/b24ucG5n',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -30],
});

function AdminMap({ markedZones }) {
    const [liveLocations, setLiveLocations] = useState({});
    const socket = useRef(null);

    useEffect(() => {
        // Initialize Socket.IO connection
        socket.current = io('http://localhost:5000'); // Update the backend server URL

        // Listen for live location updates from users
        socket.current.on('admin-receive-location', (locationData) => {
            setLiveLocations((prevLocations) => ({
                ...prevLocations,
                [locationData.userId]: locationData // Use userId as the key to update location
            }));
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    return (
        <MapContainer
            center={[31.25, 75.8]} // Default starting position
            zoom={13}
            style={{ height: '80vh', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Render live locations */}
            {Object.values(liveLocations).map((location, index) => (
                <Marker
                    key={location.userId}
                    position={[location.latitude, location.longitude]}
                    icon={customIcon}
                />
            ))}

            {/* Render marked zones */}
            {markedZones.map((zone, index) => (
                <Circle
                    key={index}
                    center={zone.center}
                    radius={zone.radius}
                    pathOptions={{ color: zone.color }}
                >
                    <Popup>{zone.message}</Popup>
                </Circle>
            ))}
        </MapContainer>
    );
}

export default AdminMap;
