import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

// Custom Icon
const customIcon = new L.Icon({
  iconUrl: 'https://imgs.search.brave.com/chhj0Pk_nGJR_zk68FQgvcf2RRS8lvMpuigijRV0zoY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudmV4ZWxzLmNv/bS9tZWRpYS91c2Vy/cy8zLzE1NDY1NS9p/c29sYXRlZC9wcmV2/aWV3LzcxZGNjYmIw/Nzc1OTdkZWE1NWRm/YzViN2E3YWY1MmM0/LWxvY2F0aW9uLXBp/bi1jb250YWN0LWlj/b24ucG5n',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -30],
});

// Custom component to recenter map on position change
function RecenterMapToPosition({ position, isLiveLocationActive, manualUpdate, zoomLevel }) {
  const map = useMap();

  useEffect(() => {
    if (isLiveLocationActive || manualUpdate) {
      map.setView(position, zoomLevel); // Recenter the map with specified zoom
    }
  }, [position, isLiveLocationActive, manualUpdate, zoomLevel, map]);

  return null;
}

function MapComponent() {
  const [livePosition, setLivePosition] = useState([51.505, -0.09]);
  const [zoomLevel, setZoomLevel] = useState(13); // Default zoom level
  const [alertTriggered, setAlertTriggered] = useState(null);
  const [testLat, setTestLat] = useState('');
  const [testLon, setTestLon] = useState('');
  const [markedZones, setMarkedZones] = useState([]);
  const [isLiveLocationActive, setIsLiveLocationActive] = useState(true); // Track live location status
  const [manualUpdate, setManualUpdate] = useState(false); // Track manual update status
  const watchIdRef = useRef(null); // Store the geolocation watcher ID
  const socket = useRef(null); // Store socket instance

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io('http://localhost:5000'); // Update the backend server URL
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

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
        setMarkedZones(zones);
      })
      .catch((error) => {
        console.error('Error fetching zones:', error);
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation && isLiveLocationActive) {
      // Watch position
      watchIdRef.current = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLivePosition([latitude, longitude]);
        setTestLat(latitude.toFixed(6));
        setTestLon(longitude.toFixed(6));
        checkUserInZone(latitude, longitude);

        // Send the live location to the admin dashboard via Socket.IO
        socket.current.emit('user-location', { latitude, longitude });
      });
    }

    // Cleanup the geolocation watcher when the component unmounts or live location is disabled
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isLiveLocationActive]);

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
      setIsLiveLocationActive(false); // Disable live location updates
      setManualUpdate(true); // Trigger manual update status
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current); // Stop live location watching
      }
      checkUserInZone(lat, lon);
      // Send the manually updated location to the admin dashboard
      socket.current.emit('user-location', { latitude: lat, longitude: lon });
    } else {
      alert('Please enter valid latitude and longitude.');
    }
  };

  const relocateToLiveLocation = () => {
    setIsLiveLocationActive(true); // Enable live location updates
    setManualUpdate(false); // Reset manual update status
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLivePosition([latitude, longitude]);
          setZoomLevel(15); // Adjust zoom level when relocating to live location
        },
        (error) => {
          console.error("Error fetching geolocation: ", error.message);
          alert("Failed to retrieve live location. Please check permissions and try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div id='map'>
      <div style={{zIndex: 999}} className="absolute top-4 w-full h-8 controls px-8 flex gap-2">
        <input
          className='p-4 border border-green-500'
          type="text"
          id="lat"
          placeholder="Latitude"
          value={testLat}
          onChange={(e) => setTestLat(e.target.value)}
        />
        <input
          className='p-4 border border-green-500'
          type="text"
          id="lon"
          placeholder="Longitude"
          value={testLon}
          onChange={(e) => setTestLon(e.target.value)}
        />
        <button className='bg-green-600 hover:bg-green-700 text-white px-4 text-nowrap' onClick={updateLocationManually}>Update Location Manually</button>
        <button className='bg-green-600 hover:bg-green-700 text-white px-4 text-nowrap' onClick={relocateToLiveLocation}>Relocate to Live Location</button>
      </div>
      <MapContainer
        center={livePosition}
        zoom={zoomLevel} // Use zoom level state directly
        style={{ height: '80vh', width: '100%' }}
        whenCreated={map => {
          // Set initial view and zoom on first render
          if (map && !isLiveLocationActive) {
            map.setView(livePosition, zoomLevel);
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={livePosition} icon={customIcon} />
        <RecenterMapToPosition position={livePosition} isLiveLocationActive={isLiveLocationActive} manualUpdate={manualUpdate} zoomLevel={zoomLevel} />
        {/* Displaying all the marked zones */}
        {markedZones.map((zone, index) => (
          <Circle
            key={index}
            center={[zone.latitude, zone.longitude]}
            radius={zone.radius}
            pathOptions={{ color: zone.color }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
