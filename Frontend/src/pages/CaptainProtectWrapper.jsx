import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'

const CaptainProtectWrapper = ( {children} ) => {
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    // If no token, redirect to captain-login
    const token = localStorage.getItem('token') // changed

    if (!token) {
      navigate('/captain-login')
      return
    }

    //const apiUrl = `${import.meta.env.VITE_BASE_URL}/captain/profile`;  // Ensure this URL is correct
    //console.log('API URL:', apiUrl);  // Log the URL to check if it is correct


    // If token exists, fetch the captain profile
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Response," , response);
        if (response.status === 200) {
          setCaptain(response.data.captain)
          console.log("Hello",response.data.captain) // remove
          setIsLoading(false) // profile data successfully fetched 
        }
      })
      .catch(err => {
        console.log(err)
        localStorage.removeItem('token') // Remove invalid token
        navigate('/captain-login') // Redirect to login in case of session expiration or error
      })
  }, [ navigate, setCaptain]) // Effect dependency array

  if (isLoading) {
    return <div>Loading...</div>
  }

  // If token exists and profile is valid, render the children components
  return <>{children}</>
}

export default CaptainProtectWrapper
