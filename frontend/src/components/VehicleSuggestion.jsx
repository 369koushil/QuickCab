import React from "react";

const VehicleSuggestion = ({ setVehiclePanel, setConfirmRidePanel }) => {
  return (
    <div className="flex flex-col gap-6 pt-4 rounded-lg ">
      <div
        onClick={() => {
          setVehiclePanel(false);
        }}
        className="text-2xl w-full  flex justify-center  items-center "
      >
        <i className="  ri-arrow-down-wide-line"></i>
      </div>
      <div>
        <h1 className="text-2xl  font-semibold"> Choose a vehicle </h1>
      </div>
      <div className="flex flex-col gap-2">
        <div
          onClick={() => {
            setConfirmRidePanel(true);
          }}
          className="flex hover:border-black  px-2 py-2 rounded-xl  border-solid border-2  justify-around bg-gray-200"
        >
          <div className="flex items-center">
            {" "}
            <img
              className=" h-14"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png"
              alt="car png"
            />
          </div>
          <div className="w-1/2">
            <h4 className="text-xl font-medium">
              UberGo{" "}
              <span className="text-base">
                <i className="text-base ri-user-fill"></i>4
              </span>
            </h4>
            <h5 className="text-l font-medium">2 mins away</h5>
            <p className="text-gray-600 text-base font-medium">
              Affordable, comapact rides
            </p>
          </div>
          <h2 className="flex items-center justify-end text-xl font-semibold">
            193.20rs
          </h2>
        </div>
        <div>
          <div className="flex hover:border-black  px-2 py-2 rounded-xl  border-solid border-2  justify-around bg-gray-200">
            <div
              onClick={() => {
                setConfirmRidePanel(true);
              }}
              className="flex items-center"
            >
              {" "}
              <img
                className=" h-14"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                alt="car png"
              />
            </div>
            <div className="w-1/2">
              <h4 className="text-xl font-medium">
                MotoGo{" "}
                <span className="text-base">
                  <i className="text-base ri-user-fill"></i>4
                </span>
              </h4>
              <h5 className="text-l font-medium">2 mins away</h5>
              <p className="text-gray-600 text-base font-medium">
                Affordable, comapact rides
              </p>
            </div>
            <h2 className="flex items-center justify-end text-xl font-semibold">
              90.20rs
            </h2>
          </div>
        </div>
        <div>
          <div className="flex hover:border-black  px-2 py-2 rounded-xl   border-solid border-2  justify-around bg-gray-200">
            <div
              onClick={() => {
                setConfirmRidePanel(true);
              }}
              className="flex items-center"
            >
              {" "}
              <img
                className=" h-14"
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                alt="car png"
              />
            </div>
            <div className="w-1/2">
              <h4 className="text-xl font-medium">
                AutoGo{" "}
                <span className="text-base">
                  <i className="text-base ri-user-fill"></i>4
                </span>
              </h4>
              <h5 className="text-l font-medium">2 mins away</h5>
              <p className="text-gray-600 text-base font-medium">
                Affordable, comapact rides
              </p>
            </div>
            <h2 className="flex items-center text-xl justify-end font-semibold">
              110.20rs
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSuggestion;
