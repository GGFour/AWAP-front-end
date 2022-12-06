//import './App.css'
import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Visualizations from './pages/Visualizations'
import DIYVisualizations from './pages/DIYVisualization'
import Navbar from './components/Navbar.js'
import N1View from './pages/N1View'
import N2View from './pages/N2View'

import { UserAuthContext } from './components/Contexts'

function App() {
  const [jwt, setJwt] = useState(window.localStorage.getItem('appAuthData'))

  useEffect(() => {
    if (jwt) {
      window.localStorage.setItem('appAuthData', jwt)
    }
  }, [jwt])

  return (
    <>
      <UserAuthContext.Provider
        value={{
          jwt: jwt,
          setJwt: setJwt,
        }}
      >
        <div className="container">
          <Navbar></Navbar>
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
