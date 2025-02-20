import React from "react";

const ConfirmRide = () => {
  return (
    <div>
      <h5 className="p-1 text-center absolute top-0 w-[93%] ">
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line "></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 ">Confirm your Ride</h3>
      <div className="flex flex-col items-center justify-between ">
        <div>
          <img
            className="h-25"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
        </div>
        <div className="w-full mt-5 gap-2">
          <div className="flex flex-row items-center gap-5 p-3 border-b-2 border-gray-200 ">
            <i className=" text-lg ri-map-pin-4-fill"></i>
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-gray-600 text-sm -mt-1 ">
                Kankariya Talab,Bhopal
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-5 p-3 border-b-2 border-gray-200 ">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="font-medium text-lg">562/11-A</h3>
              <p className="text-gray-600 text-sm -mt-1 ">
                Kankariya Talab,Bhopal
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-5 p-3 ">
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className="font-medium text-lg">193.20</h3>
              <p className="text-gray-600 text-sm -mt-1 ">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              setvehicleFound(true)
            }}
            className=" mt-5 bg-green-700 w-full text-white text-xl font-semibold p-2 rounded-lg  "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRide;
