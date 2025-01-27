import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTrackingDriver from '../components/LiveTrackingDriver';
import axios from 'axios';

const CaptainRiding = (props) => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;

    const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });
    const [pickup, setPickup] = useState(rideData.pickupcoord);
    const [distance, setDistance] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            // Get initial location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const updatedLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentLocation(updatedLocation);

                    // Fetch initial distance and time
                    fetchDistanceAndTime(updatedLocation, pickup);
                },
                (error) => {
                    console.error("Error fetching initial location:", error.message);
                }
            );

            // Watch for location updates
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const updatedLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentLocation(updatedLocation);

                    // Fetch updated distance and time
                    // fetchDistanceAndTime(updatedLocation, pickup);
                },
                (error) => {
                    console.error("Error watching location:", error.message);
                }
            );

            // Cleanup watchPosition on unmount
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, [pickup]);

    const fetchDistanceAndTime = async (current, pickup) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`, {
                params: {
                    origin: `${pickup.lat},${pickup.lng}`,
                    destination: `${current.lat},${current.lng}`,
                },
            });

            if (response.status === 200) {
                const { distance, time } = response.data;
                setDistance(distance);
                setTime(time);
            }
        } catch (error) {
            console.error("Error fetching distance and time:", error.message);
        }
    };

    useGSAP(
        () => {
            if (finishRidePanel) {
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(0)',
                });
            } else {
                gsap.to(finishRidePanelRef.current, {
                    transform: 'translateY(100%)',
                });
            }
        },
        [finishRidePanel]
    );

    return (
        <div className="h-screen relative flex flex-col justify-end">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img
                    className="w-16"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt=""
                />
                <Link
                    to="/captain-home"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div
                className="h-1/5 p-6 flex items-center justify-center relative bg-yellow-400 pt-10"
                onClick={() => {
                    setFinishRidePanel(true);
                }}
            >
                <h5
                    className="p-1 text-center w-[90%] absolute top-0"
                    onClick={() => {}}
                >
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </h5>
                <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
                    Complete Ride
                </button>
            </div>
            <div
                ref={finishRidePanelRef}
                className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
            >
                <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>

            <div className="h-screen fixed w-screen top-0 z-[-1]">
                <LiveTrackingDriver />
            </div>
        </div>
    );
};

export default CaptainRiding;
