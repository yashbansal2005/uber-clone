import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { CaptainDataContext } from '../context/captainContext'
// comment added
function CaptainLogin() {
const navigate= useNavigate()
const {captain,setCaptain}=useContext(CaptainDataContext)

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
// const [captainData, setCaptainData] = useState({})  

 const submitHandler = async(e) => {
  e.preventDefault()
  // setCaptainData({ // hook to store email and password
   const captain={ email: email, //stored to send it to backend 
    password: password
  }
  const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain)

if(response.status===200){
  const data =response.data
  setCaptain(data.captain)
  console.log(data.token) // remove
  localStorage.setItem('token',data.token)
  navigate('/captain-home')
}


  setEmail('')
  setPassword('') 
} 

  return (
    <div>
       <div className='p-6 h-screen flex flex-col justify-between '>
<div>
<img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="not available" />

<form action="" onSubmit={(e)=> {submitHandler(e)}}>

  <h3 className='text-xl  font-medium mb-2'> Please enter your email</h3>

  <input 
    value={email}
    onChange={(e)=>setEmail(e.target.value)}

     className='bg-[#eeeeee] mb-5  px-4 py-2 rounded w-full text-lg  placeholder:text-base'
     required 
     type="email"
     placeholder="email@example.com"/>

  <h3  className='text-lg font-medium mb-2'> Enter Password</h3>

  <input  
  value={password}
  onChange={(e)=>setPassword(e.target.value)}

  className='bg-[#eeeeee] mb-5   px-4 py-2 rounded w-full text-lg placeholder:text-base'
   required
   type="password"
   placeholder='password' />

  <button className='bg-[#111] text-white mb-0.5 font-normal border px-4 py-2 rounded w-full text-lg' >Login</button>
</form>

<p className='text-center font-normal mb-3 '> Join a fleet?
<Link to='/captain-signup' className='text-blue-600'>Register as a Capatin</Link>
</p>
</div>

<div>
  <Link to='/login'  className=' flex justify-center items-center bg-[#86b962]  text-white mb-4 border px-4 py-2 rounded w-full text-lg'>
    Sign in as User</Link>
</div>
</div>
    
  
    </div>
  )
}

export default CaptainLogin
