import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

function UserLogin() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate()
const{user,setUser}=useContext(UserDataContext)
  
 const submitHandler = async(e) => {
  e.preventDefault()
  const userData={ // to send the data to backend 
    email: email,
  password: password
  }

try {
  
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);
  
if(response.status===200)
{ 

  const data=response.data;
  setUser(data.user)
  localStorage.setItem('token',data.token) //token sent to the local storage in case user refresh the site so his token remians stored and can reload to the logged in page already and it is also used to verify the tokenn for jome page 
  // console.log(data.token) 
  navigate('/home')
}

} catch (error) {
  if (error.response) {
    // Server responded with an error status code (e.g., 400, 500)
    console.log("Error Status:", error.response.status);
    // console.log("Error Data:", error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.log("No Response Received:", error.request);
  } else {
    // Other errors (e.g., network issues)
    console.log("Error:", error.message);
}

  setEmail('')
  setPassword('') 
  }}

  return (
    <div className='p-6 h-screen flex flex-col justify-between '>
<div>
<img className='w-18 mb-3' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />

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

<p className='text-center font-normal mb-3 '> New here?
<Link to='/signup' className='text-blue-600'>Create new Account</Link>
</p>
</div>

<div>
  <Link to='/captain-login'  className=' flex justify-center items-center bg-[#86b962]  text-white mb-4 border px-4 py-2 rounded w-full text-lg'>
    Sign in as Captain</Link>
</div>
</div>
    
  )
  }

export default UserLogin
