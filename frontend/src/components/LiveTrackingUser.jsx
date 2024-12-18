import React, { useState, useEffect, useContext } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { SocketContext } from '../context/SocketContext';
import { useLocation } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const LiveTracking = () => {
    const { receiveMsg } = useContext(SocketContext);
    const location = useLocation();

    // Initialize state with default coordinates or received data
    const [pickup, setPickup] = useState(location.state?.ride?.pickupcoord || { lat: 0, lng: 0 });
    const [destination, setDestination] = useState(location.state?.ride?.destinationcoord || { lat: 0, lng: 0 });
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // State to track if Google Maps API is loaded

    // Log location state to check passed data
    useEffect(() => {
        console.log('Location state:', location.state);
    }, [location]);

    // Receive updated driver location
    useEffect(() => {
        receiveMsg('driver-location', (data) => {
            const { lat, lng } = data;
            setPickup({ lat, lng });
        });
    }, [receiveMsg]);

    // Request directions if both pickup and destination are available
    useEffect(() => {
        if (pickup && destination && isLoaded) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: pickup,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                    } else {
                        console.error(`Directions request failed due to ${status}`);
                    }
                }
            );
        }
    }, [pickup, destination, isLoaded]);

    // Handle Google Maps API onLoad event
    const handleScriptLoad = () => {
        setIsLoaded(true);
    };

    // Log pickup and destination to verify correct values
    useEffect(() => {
        console.log('Pickup:', pickup);
        console.log('Destination:', destination);
    }, [pickup, destination]);

    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onLoad={handleScriptLoad} // This ensures the API is loaded before rendering
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={pickup.lat && pickup.lng ? pickup : { lat: 0, lng: 0 }}
                zoom={15}
            >
                {/* Render Rider Marker */}
                {pickup.lat && pickup.lng && <Marker position={pickup} label="Rider" />}
                
                {/* Render Destination Marker only if destination has valid coordinates */}
                {destination.lat && destination.lng && (
                    <Marker position={destination} label="Destination" />
                )}

                {/* Render Directions if available */}
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;
