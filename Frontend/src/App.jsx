import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import CaptainSignup from './pages/CaptainSignup'
import UserLogout from './pages/UserLogout.jsx'
import UserSignup from './pages/UserSignup'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'


function App() {
  const location = useLocation() // Get current location

  return (
    <>
      <div key={location.pathname}>  {/* Key prop forces re-render on route change */}
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/captain-login' element={<CaptainLogin />} />
          <Route path='/captain-signup' element={<CaptainSignup />} />
          <Route path='/home' element={
            <UserProtectWrapper><Home/></UserProtectWrapper>
          } />
          <Route path='/user/logout' element={<UserProtectWrapper><UserLogout/></UserProtectWrapper>} />
          <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>} />
        </Routes>
      </div>
    </>
  )
}

export default App
