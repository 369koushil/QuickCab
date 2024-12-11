import React, { useState, useRef } from "react";
import { use } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSuggestion from "../components/VehicleSuggestion";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const[waitingForDriverPanel,setWaitingForDriverPanel]=useState(false);
  const[lookingForDriverPanel,setLookingForDriverPanel]=useState(false);
  const panelRef = useRef(null);
  const chevronRef = useRef(null);
  const vehiclesugRef = useRef(null);
  const confirmRideRef = useRef(null);
  const waitingForDriverRef=useRef(null);
  const lookingForDriverRef=useRef(null);
  const submitHabdler = (e) => {
    e.preventDefault();
  };
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
      <img
        className=" w-20 absolute top-0  "
        src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png"
        alt=""
      />
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
                setDest(e.target.value);
              }}
              className="px-12 py-3 bg-gray-100 rounded-lg w-full mt-4"
              type="text"
              placeholder="Add a destination location"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            suggestions={[1, 2, 3, 4, 5]}
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
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white p-2 rounded-xl"
      >
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setLookingForDriverPanel={setLookingForDriverPanel}/>
      </div>

      <div
        ref={lookingForDriverRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white p-2 rounded-xl"
      >
       <LookingForDriver setLookingForDriverPanel={setLookingForDriverPanel} />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full  z-10 bottom-0 bg-white p-2 rounded-xl"
      >
       <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel}/>
      </div>
    </div>
  );
};

export default Home;
