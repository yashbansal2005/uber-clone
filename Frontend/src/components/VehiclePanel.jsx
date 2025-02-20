import React from 'react'


const VehiclePanel = ({setConfirmRidePanel, setVehiclePanel}) => {
  return (
    <div>
      <h5 onClick={()=>{
    setVehiclePanel(false)
  }} className='p-1 text-center absolute top-0 w-[93%] '>
    <i className=" text-3xl text-gray-300 ri-arrow-down-wide-line "></i></h5> 
 <h3 className='text-2xl font-semibold mb-5 '>Choose a vehicle</h3>

  <div onClick={()=>{
    setConfirmRidePanel(true)
  }} className=' flex w-full active:border-3 mb-2 border-black rounded-xl items-center py-3 px-2 justify-between '>
    <img className='h-14 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
  <div className=' w-1/2 ml-2'>
    <h4 className='font-medium text-lg'>UberGo <span><i className="ri-user-fill">4</i></span></h4>
    <h5 className='font-medium text-sm'>2 mins away</h5>
    <p className='font-normal text-xs text-gray-600 '>Affordable,compact rides</p>
  </div>
  <h2 className='font-semibold text-lg'> ₹193.20</h2>
  </div>

  <div onClick={()=>{
    setConfirmRidePanel(true)
  }} className=' flex w-full active:border-3 mb-2 border-black rounded-xl items-center py-3 px-2 justify-between '>
    <img className='h-14 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
  <div className=' w-1/2 ml-2'>
    <h4 className='font-medium text-lg'>Moto <span><i className="ri-user-fill">1</i></span></h4>
    <h5 className='font-medium text-sm'>3 mins away</h5>
    <p className='font-normal text-xs text-gray-600 '>Affordable Motorcycle rides</p>
  </div>
  <h2 className='font-semibold text-lg'> ₹65.0</h2>
  </div>

  <div onClick={()=>{
    setConfirmRidePanel(true)
  }} className=' flex w-full active:border-3 mb-2 border-black rounded-xl items-center py-3 px-2 justify-between '>
    <img className='h-14 ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
  <div className=' w-1/2 ml-2'>
    <h4 className='font-medium text-lg'>UberAuto <span><i className="ri-user-fill">3</i></span></h4>
    <h5 className='font-medium text-sm'>2 mins away</h5>
    <p className='font-normal text-xs text-gray-600 '>Personal Auto rides</p>
  </div>
  <h2 className='font-semibold text-lg'> ₹118.68</h2>
  </div>

    </div>
  )
}

export default VehiclePanel
