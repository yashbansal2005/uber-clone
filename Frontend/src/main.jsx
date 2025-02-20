import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContext.jsx'
import  CaptainContextProvider  from './context/captainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CaptainContextProvider>
   <UserContextProvider>
    
      <App />
    
    </UserContextProvider>
    </CaptainContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
