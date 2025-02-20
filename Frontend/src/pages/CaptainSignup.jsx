import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CaptainSignup() {
const navigate =useNavigate()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('') 
const [vehicleColor, setVehicleColor] = useState('') 
const [vehicleCapacity,setVehicleCapacity] = useState('') 
const [vehiclePlate,setVehiclePlate] = useState('') 
const [vehicleType, setVehicleType] = useState('') 



const {captain,setCaptain}=useContext(CaptainDataContext)

 const submitHandler = async(e) => {
  e.preventDefault()
  const captainData={  // captain data is stored in capatain data to send to the server 
    email: email,
    password: password,
  fullname:{
    firstname: firstName,
    lastname: lastName
 },
 vehicle:{
  color:vehicleColor,
plate:vehiclePlate,
capacity:vehicleCapacity ,
vehicleType:vehicleType
 }
}

const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData)

if(response.status===201){
  const data=response.data
  setCaptain(data.captain)
  localStorage.setItem('token',data.token)
  navigate('/captain-home') 
}

  setEmail('')
  setPassword('') 
  setFirstName('')  
  setLastName('')
setVehicleColor('')
setVehicleCapacity('')
setVehiclePlate('')
setVehicleType('')
}

  return (
    <div>
      <div className=' px-5 py-5  h-screen flex flex-col justify-between '>
<div>
<img className='w-18 mb-3' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />

<form action="" onSubmit={(e)=> {submitHandler(e)}}>

<h3 className='text-lg  font-medium mb-2' >What's our captain's name</h3>

<div className='flex gap-4 '>

<input
     className='bg-[#eeeeee] mb-5  px-4 py-2 rounded w-1/2 font-medium text-lg placeholder:text-base'
     required 
     type="text"
     placeholder="First name"
     value={firstName}  
      onChange={(e)=>setFirstName(e.target.value)}
      />

<input
     className='bg-[#eeeeee] mb-5  px-4 py-2 rounded w-1/2 text-lg font-medium placeholder:text-base'
     required 
     type="text"
     placeholder="Last name"
      value={lastName}  
        onChange={(e)=>setLastName(e.target.value)}
        />

</div>

  <h3 className='text-lg  font-medium mb-2'> What's our captain's email</h3>

  <input 
     className='bg-[#eeeeee] mb-5  px-4 py-2 rounded font-medium w-full text-lg  placeholder:text-base'
     required 
     type="email"
     placeholder="email@example.com"
     value={email}
     onChange={(e)=>{
      setEmail(e.target.value)
     }}
     />
     
    
  <h3  className='text-lg font-medium mb-2'> Enter Password</h3>

  <input  
  className='bg-[#eeeeee] mb-5  font-medium px-4 py-2 rounded w-full text-lg placeholder:text-base'
   required
   type="password"
   placeholder='password' 
    value={password} 
    onChange={(e)=>setPassword(e.target.value)}/>

<h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>

<div className ='flex  gap-4 mb-7'>
<input  
  className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 rounded w-full text-lg placeholder:text-base'
   required
   type="text"
   placeholder='Vehicle Color' 
    value={vehicleColor} 
    onChange={(e)=>
    setVehicleColor(e.target.value)}
    />
  
    <input  
    className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 rounded w-full text-lg placeholder:text-base'
     required
     type="text"
     placeholder='Vehicle Plate' 
      value={vehiclePlate} 
      onChange={(e)=>
      setVehiclePlate(e.target.value)}/>
      </div>
      < div className='flex gap-4 mb-7'>
      <input className='bg-[#eeeeee] w-full rounded-lg  px-4 py-2 rounded w-full text-lg placeholder:text-base'
   required
   type="number"
   placeholder='Vehicle Capacity' 
    value={vehicleCapacity} 
    onChange={(e)=>setVehicleCapacity(e.target.value)}/>

    <select 
    required
    className='bg-[#eeeeee] w-full rounded-lg px-4 py-2 rounded w-full text-lg placeholder:text-base'
    value={vehicleType}
    onChange={(e)=>{
      setVehicleType(e.target.value)
    }}
    >
      <option value="" disabled  >Select Vehicle Type</option>
      <option value="car">Car</option>
      <option value="auto">Auto</option>
      <option value="motorbike">Motorbike</option>

    </select>
    </div>
  
  <button className='bg-[#111] text-white mb-0.5 font-normal border px-4 py-2 rounded w-full text-lg' >Create captain's account</button>
</form>

<p className='text-center font-normal mb-3 '> Already have an account?
<Link to='/captain-login' className='text-blue-600'>Login here</Link>
</p>
</div>

<div>
  <p className='text-[13px] text-[#6B6B6B]'>This site is protected by reCAPTCHA and the Google <span className='underline'>Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
</div>
</div>
    
    </div>
  )
}




export default CaptainSignup
