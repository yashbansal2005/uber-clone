import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [isLoading, setIsLoading] = useState(true)
  const { user, setUser } = useContext(UserDataContext)

  useEffect(() => {
    // If no token, redirect to login
    if (!token) {
      navigate('/login')
    } else {
      // If token exists, make the API call
      axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            setUser(response.data.user)
            setIsLoading(false) // means token is matched from local storage and profile of the user is valid
          }
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('token') // Remove token if there's an error
          navigate('/login') // In case of session expiration or invalid token
        })
    }
  }, [token, navigate, setUser]) // Dependencies to ensure effect only runs when token or navigate changes

  if (isLoading) {
    return <div>Loading...</div>
  }

  // If token exists, render the children components
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
