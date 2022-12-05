//import './App.css'
import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Visualizations from './pages/Visualizations'
import DIYVisualizations from './pages/DIYVisualization'
import Navbar from './components/Navbar.js'
import { UserAuthContext } from './components/Contexts'
import { useState } from 'react'
import N1View from './pages/N1View'
import N2View from './pages/N2View'

const jwtFromStorage = window.localStorage.getItem('appAuthData')
function App() {
  const initialAuthData = {
    jwt: jwtFromStorage,
    login: (newValueForJwt) => {
      const newAuthData = { ...userAuthData, jwt: newValueForJwt }
      window.localStorage.setItem('appAuthData', newValueForJwt)
      setUserAuthData(newAuthData)
    },
    logout: () => {
      window.localStorage.removeItem('appAuthData')
      setUserAuthData({ ...initialAuthData })
    },
  }
  const [userAuthData, setUserAuthData] = useState({ ...initialAuthData })

  return (
    <>
      <UserAuthContext.Provider value={userAuthData}>
        <div className="container">
          <UserAuthContext.Provider
            value={userAuthData}
          ></UserAuthContext.Provider>
          <Navbar></Navbar>
          <UserAuthContext.Provider
            value={userAuthData}
          ></UserAuthContext.Provider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/visualizations" element={<Visualizations />}></Route>
            <Route path="/diy" element={<DIYVisualizations />}></Route>
            <Route path="/n1view" element={<N1View />}></Route>
            <Route path="/n2view" element={<N2View />}></Route>
          </Routes>
        </div>
      </UserAuthContext.Provider>
    </>
  )
}

export default App
