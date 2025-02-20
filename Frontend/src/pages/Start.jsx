import React from 'react'
import { Link } from 'react-router-dom'  

function Start() {
  return (
    <div>
      <div className=' bg-contain  bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-5 h-screen w-full bg-red-400 flex justify-between flex-col'>

        <img className='w-20 ml-7' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="Comapny's name " />

        <div className='bg-white py-4 px-4 pb-6'>
          <h2 className='text-3xl font-semibold' >Get started with Uber</h2>
        <Link to='/login' className= ' flex items-center justify-center bg-black w-full text-white py-3 rounded mt-5'>Continue</Link>
        </div>


      </div>
    </div>
  )
}

export default Start
