import React, { useState, useRef, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSuggestion from "../components/VehicleSuggestion";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";
import axios from'axios';
import UserContext, { UserDataContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";


const Home = () => {
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const[waitingForDriverPanel,setWaitingForDriverPanel]=useState(false);
  const[lookingForDriverPanel,setLookingForDriverPanel]=useState(false);
  const [suggestions,setSuggestions]=useState([]);
  const [activeField,setActiveField]=useState(null);
  const [fare,setFare]=useState([0,0,0]);
  const [vehicleType,setVehicleType]=useState(null);
  const [ vehicleFound, setVehicleFound ] = useState(false)
  const[ride,setRide]=useState(null);
  const panelRef = useRef(null);
  const chevronRef = useRef(null);
  const vehiclesugRef = useRef(null);
  const confirmRideRef = useRef(null);
  const waitingForDriverRef=useRef(null);
  const lookingForDriverRef=useRef(null);
const {sendMsg,receiveMsg} =useContext(SocketContext);
const {user}=useContext(UserDataContext)
const navigate=useNavigate();

useEffect(()=>{
  console.log(user)
  sendMsg("join",{userId:user._id,userType:"user"})
},[user])


receiveMsg('ride-confirmed', ride => {
  console.log(ride)
  setVehicleFound(false)
  setWaitingForDriverPanel(true)
  setRide(ride)
})

receiveMsg('ride-started', ride => {
  console.log("ride")
  setWaitingForDriverPanel(false)
  navigate('/riding', { state: { ride } }) 
})

  const createRide=()=>{
    
    axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        userId: user._id,
        pickup: pickup,
        destination: dest,
        vehicleType: vehicleType
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem('token')
        }
      }
    ).then(response=>{
      console.log(response.data)
    })
  }

  const submitHabdler = (e) => {
    e.preventDefault();
    
  };


  useEffect(()=>{
     axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
      params:{
        input:pickup
      }
    }).then(sugges=>{
      setSuggestions(sugges.data)
      setActiveField('pickup')
      console.log(suggestions)
    }).catch(err=>{
      console.log(err)
    }) 
   
  },[pickup])

  useEffect(()=>{
     axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
      headers:{
        Authorization:`bearer ${localStorage.getItem('token')}`
      },
      params:{
        input:dest
      }
    }).then(sugges=>{
      setActiveField('destination')
      setSuggestions(sugges.data);
      console.log(suggestions)
    }).catch(err=>{
      console.log(err)
    })
  
  },[dest])

  console.log(vehiclePanel);
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(chevronRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(chevronRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclesugRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclesugRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );

  useGSAP(
    function () {
      if (lookingForDriverPanel) {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriverPanel]
  );


  return (
    <div>
      
      <div className="h-screen w-screen ">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="overflow-y-hidden  flex flex-col justify-end  absolute  w-full h-screen   top-0 ">
        <div className="h-[30%] bg-white p-5 rounded-lg  relative ">
          <h5
            onClick={() => {
              setPanelOpen(false);
              setVehiclePanel(false);
            }}
            ref={chevronRef}
            className="absolute top-4 right-6 text-xl "
          >
            <i className="  ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-bold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHabdler(e);
            }}
          >
            <div className="line h-16 left-10 bottom-12 w-1  absolute rounded-lg  bg-black"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => {
                console.log(e.target.value)
                setPickup(e.target.value);
              }}
              className="px-12 py-3 bg-gray-100 rounded-lg w-full mt-4"
              type="text"
              placeholder="Add a pick up location"
            />

            <input
              onClick={() => setPanelOpen(true)}
              value={dest}
              onChange={(e) => {
                console.log(e.target.value)
                setDest(e.target.value);
              }}
              className="px-12 py-3 bg-gray-100 rounded-lg w-full mt-4"
              type="text"
              placeholder="Add a destination location"
            />
          </form>
        </div>
        
        <div ref={panelRef} className="
         overflow-y-scroll  bg-white ">
        <div className="bg-white flex  px-4 justify-center "> <button onClick={()=>{

          axios.get(`${import.meta.env.VITE_BASE_URL}rides/get-fare`,{
            headers:{
              Authorization:`bearer ${localStorage.getItem('token')}`
            },params:{
              pickup:pickup,
              destination:dest
            }
          }).then(f=>{
            
              setFare(f.data);
              console.log(fare)
          })
          setVehiclePanel(true)
        }}  className="bg-black text-white h-10 w-full rounded-xl  text-lg font-medium ">Book Now</button></div>
          <LocationSearchPanel
           suggestion={suggestions}
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDest}
           activeField={activeField}
           setSuggestions={setSuggestions}
          />
        </div>
      </div>
      <div
        ref={vehiclesugRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white p-2 rounded-xl"
      >
        <VehicleSuggestion
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white p-2 rounded-xl "
      >
        <ConfirmRide 
         createRide={createRide} vehicleType={vehicleType} fare={fare} pickup={pickup} destination={dest} 
             setVehiclePanel={setVehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
         setPanelOpen={setPanelOpen}
         setLookingForDriverPanel={setLookingForDriverPanel}/>
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed w-full  translate-y-full z-10 bottom-0 bg-white p-2 rounded-xl"
      >
       <LookingForDriver
       fare={fare}
       pickup={pickup}
       destination={dest}
       vehicleType={vehicleType}
        setLookingForDriverPanel={setLookingForDriverPanel} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriverPanel}
                    waitingForDriver={waitingForDriverPanel} />
            </div>
    </div>
  );
};

export default Home;
