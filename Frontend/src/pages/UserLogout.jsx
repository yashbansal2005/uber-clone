import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    // Make the API call inside useEffect
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    })
    .catch((error) => {
      console.error('Logout failed:', error);
      // Handle error, possibly navigate to login or show an error message
    });
  }, [navigate, token]); // Dependency array ensures it only runs once

  return (
    <div>
      Logging out...
    </div>
  );
};

export default UserLogout;
