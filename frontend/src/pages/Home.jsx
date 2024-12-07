import React, { useState, useRef } from "react";
import { use } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const chevronRef=useRef(null);
  const submitHabdler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(chevronRef.current,{
          opacity:1
        })
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        })
        gsap.to(chevronRef.current,{
          opacity:0
        })
      }
    },
    [panelOpen]
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
      <div className="  flex flex-col justify-end  absolute  w-full h-screen   top-0 ">
        <div className="h-[30%] bg-white p-5 rounded-lg  relative ">
          <h5 onClick={()=>setPanelOpen(false)} ref={chevronRef} className="absolute top-4 right-6 text-xl "><i className="  ri-arrow-down-wide-line"></i></h5>
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
        <div ref={panelRef} className="h-0 bg-red-500"></div>
      </div>
    </div>
  );
};

export default Home;
