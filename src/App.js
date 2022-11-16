//import './App.css'
import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Visualizations from './pages/Visualizations'
import Navbar from './components/Navbar.js'

function App() {
  return (
    <>
      <div className="container">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/visualizations" element={<Visualizations />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
