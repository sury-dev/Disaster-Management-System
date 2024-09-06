import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Custom Icon
const customIcon = new L.Icon({
  iconUrl: 'https://imgs.search.brave.com/chhj0Pk_nGJR_zk68FQgvcf2RRS8lvMpuigijRV0zoY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudmV4ZWxzLmNv/bS9tZWRpYS91c2Vy/cy8zLzE1NDY1NS9p/c29sYXRlZC9wcmV2/aWV3LzcxZGNjYmIw/Nzc1OTdkZWE1NWRm/YzViN2E3YWY1MmM0/LWxvY2F0aW9uLXBp/bi1jb250YWN0LWlj/b24ucG5n',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -30],
});

// Component to Recenter Map
function RecenterMap({ position, zoomLevel }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, zoomLevel); // Set zoom level
  }, [position, zoomLevel, map]);
  return null;
}

function MapComponent() {
  const [livePosition, setLivePosition] = useState([51.505, -0.09]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [alertTriggered, setAlertTriggered] = useState(null);
  const [testLat, setTestLat] = useState('');
  const [testLon, setTestLon] = useState('');
  const [markedZones, setMarkedZones] = useState([]);

  useEffect(() => {
    // Fetch zones from the backend
    axios.get('http://localhost:5000/api/mapzone/zones')
      .then((response) => {
        const zones = response.data.map(zone => ({
          latitude: parseFloat(zone.latitude),
          longitude: parseFloat(zone.longitude),
          radius: parseFloat(zone.radius),
          message: zone.message,
          riskLevel: zone.riskLevel,
          color: zone.color && /^#([0-9A-F]{3}){1,2}$/i.test(zone.color) ? zone.color : '#0000ff' // Validate color
        }));
        console.log('Fetched zones:', zones); // Log the sanitized data
        setMarkedZones(zones);
      })
      .catch((error) => {
        console.error('Error fetching zones:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLivePosition([latitude, longitude]);
        setTestLat(latitude.toFixed(6));
        setTestLon(longitude.toFixed(6));
      });

      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLivePosition([latitude, longitude]);
        setTestLat(latitude.toFixed(6));
        setTestLon(longitude.toFixed(6));
        checkUserInZone(latitude, longitude);
      });
    }
  }, []);

  const checkUserInZone = (lat, lon) => {
    const userLatLng = L.latLng(lat, lon);

    markedZones.forEach((zone) => {
      const distance = userLatLng.distanceTo([zone.latitude, zone.longitude]);

      if (distance <= zone.radius) {
        if (alertTriggered !== zone.message) {
          alert(`Risk Level: ${zone.riskLevel}\nMessage: ${zone.message}`);
          setAlertTriggered(zone.message);
        }
      } else if (alertTriggered) {
        setAlertTriggered(null);
      }
    });
  };

  const updateLocationManually = () => {
    const lat = parseFloat(testLat);
    const lon = parseFloat(testLon);

    if (!isNaN(lat) && !isNaN(lon)) {
      setLivePosition([lat, lon]);
      checkUserInZone(lat, lon);
    } else {
      alert('Please enter valid latitude and longitude.');
    }
  };

  const relocateToLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude: " + latitude + ", Longitude: " + longitude);
          setLivePosition([latitude, longitude]);
          setZoomLevel(13); // Optional: reset zoom level
        },
        (error) => {
          // Handle geolocation errors
          console.error("Error fetching geolocation: ", error.message);
          alert("Failed to retrieve live location. Please check permissions and try again.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <div className="controls">
        <input
          type="text"
          id="lat"
          placeholder="Latitude"
          value={testLat}
          onChange={(e) => setTestLat(e.target.value)}
        />
        <input
          type="text"
          id="lon"
          placeholder="Longitude"
          value={testLon}
          onChange={(e) => setTestLon(e.target.value)}
        />
        <button onClick={updateLocationManually}>Update Location Manually</button>
        <button onClick={relocateToLiveLocation}>Relocate to Live Location</button> {/* New button added */}
      </div>
      <MapContainer center={livePosition} zoom={zoomLevel} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={livePosition} icon={customIcon}></Marker>
        <RecenterMap position={livePosition} zoomLevel={zoomLevel} />
        {Array.isArray(markedZones) && markedZones.map((zone, index) => (
          <Circle
            key={index}
            center={[zone.latitude, zone.longitude]}
            radius={zone.radius}
            pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.5 }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
