// to render all location 
import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel }) => {
// console.log({ setPanelOpen, setVehiclePanel });
const locations=[
   " WZ-171/street no-10, Shiv Nagar, Janakpuri, Delhi ",
"12, Ring Road Market, Sarojini Nagar, New Delhi",
"45, Chandni Chowk, Delhi-110006",
"A-2/15, Safdarjung Enclave, New Delhi"
]

  return (
    <div>
      {/* this is sample data  */}
      {
        locations.map(function(elem,idx){ //loop  for locations 
            return   <div key={idx} onClick={()=>{
                setVehiclePanel(true)
                setPanelOpen(false)
            }}
             className='border-2 p-3 rounded-xl border-gray-100 active:border-black flex items-center justify-start gap-4 mb-2'>
            <h2 className='flex justify-center items-center rounded-full bg-[#eee] h-8 w-10  '>

                <i className="ri-map-pin-range-line " ></i></h2>
    
            <h4 className='font-medium '>{elem}</h4>
          </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel
