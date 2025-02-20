import React, { useActionState, useRef } from 'react'
import { useState } from 'react'
import {useGSAP}from '@gsap/react'
import gsap from  'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';


const Home = () => {
const [pickup ,setPickup]=useState('')
const [destination ,setDestination]=useState('')
const [panelOpen,setPanelOpen] =useState(false)  
const panelRef=useRef(null) //using reference for gsap 
const confirmRidePanelRef=useRef(null)
const panelCloseRef =useRef(null)
const vehicleFoundRef =useRef(false)
const [vehiclePanel,setVehiclePanel] =useState(false)
const [confirmRidePanel,setConfirmRidePanel]=useState(false)
const [vehicleFound,setVehicleFound]=useState(false)
const vehiclePanelRef=useRef(null)

  const submitHandler=(e)=>{
    e.preventDefault()
  }

useGSAP(function(){
if(panelOpen)//when i click the input 
  {gsap.to(panelRef.current,{
  height:'70%',
  padding:24,
  // opacity:1
})
gsap.to(panelCloseRef.current,{
  opacity:1
})
}
else{
  gsap.to(panelRef.current,{
    height:'0%',
    padding:0
    // opacity:0
  })
  gsap.to(panelCloseRef.current,{
    opacity:0})
}
  // helps us to target the current value of the height of div
},[panelOpen])  // we want to run this when our panelOpen value changes 

useGSAP(function(){  
  // when we click on any location then the vehicle wala div will appear
  if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    })
  }
},[vehiclePanel])

useGSAP(function(){  
  // when we click on any location then the vehicle wala div will appear
  if(confirmRidePanel){
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)'
    })
  }
},[confirmRidePanel])

useGSAP(function(){  
  // when we click on any location then the vehicle wala div will appear
  if(vehicleFound){
    gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)'
    })
  }
  else{
    gsap.to(vehicleFoundRef.current,{
      transform:'translateY(100%)'
    })
  }
},[vehicleFound])


  return (
    <div className='h-screen relative overflow-hidden'>
<img className='w-16 left-5 top-5 absolute' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber logo" />

<div  className='h-screen w-screen '>
  <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
</div>


<div className=' absolute h-screen top-0 w-screen flex flex-col justify-end '>

 <div className='h-[30%] p-6 bg-white relative '>
  <h5 className='absolute opacity-0 right-6 top-6 text-2xl '
  ref={panelCloseRef}
  onClick={()=>{
    setPanelOpen(false)
  }}
  > 

  {/* form div below  */}
  <i className="ri-arrow-down-wide-line"></i>
  </h5>
 <h4 className='font-semibold text-2xl'>Find a trip</h4>
  <form onSubmit={(e)=> {
    submitHandler(e)}}> 

    <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>
    <input className='text-base bg-[#eee] py-2 px-12 rounded-lg mt-5 w-full'
     type="text"
     onClick={()=>{
      setPanelOpen(true)
     }} 
     placeholder='Add a pick-up location'
     value={pickup}
     onChange={(e)=>{
      setPickup(e.target.value)
     }}
     />
    <input className='text-base bg-[#eee] py-2 px-12 rounded-lg w-full mt-3' 
    type="text"
    onClick={()=>{
      setPanelOpen(true)
     }} 
     placeholder='Enter your destination' 
     value={destination}
     onChange={(e)=>{
      setDestination(e.target.value)
     }} 
     />
  </form>
 </div>

{/* locations div below */}
 <div ref={panelRef} className='bg-white h-[0] mt-0'> 
  {/* when we need to shift this div on the full screen then we need to make the h-full */}
<LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} /> 
{/* we have passed props in LocationSearchPanel */}
 </div>

</div>

{/* vehicles div below */}
<div ref={vehiclePanelRef}  className='  bottom-0 fixed w-full z-10 bg-white px-3 py-10 translate-y-full pt-12 '> 
 <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel = {setVehiclePanel} ></VehiclePanel>
</div>
<div ref={confirmRidePanelRef}   className='  bottom-0 fixed w-full z-10 bg-white px-3 py-6 translate-y-full pt-12 '> 
<ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} ></ConfirmRide>
</div>
<div ref={vehicleFoundRef}  className='  bottom-0 fixed w-full z-10 bg-white px-3 py-6 translate-y-full pt-12 '> 
<LookingForDriver></LookingForDriver>
</div>

    </div>
  )
}

export default Home
