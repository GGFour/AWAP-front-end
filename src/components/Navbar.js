import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'

function Navbar() {
  const [signupStatus, setSignupStatus] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [togglehome, setToggleHome] = useState(true)

  const backHome = () => {
    setToggleHome(!togglehome)
  }
  const openSignup = () => {
    setSignupStatus(!signupStatus)
  }
  const openLogin = () => {
    setLoginStatus(!loginStatus)
  }
  const closeModal = () => {
    setSignupStatus(false)
    setLoginStatus(false)
  }
  return (
    <div className="navbar">
      <div className=" navbar-left">
        <Link to={togglehome ? '/visualizations' : '/'} onClick={backHome}>
          {togglehome ? 'Visualizations' : 'Home'}
        </Link>
      </div>
      <div className="hidden"></div>
      <div></div>
      <div className="navbar-right">
        <a href="#" onClick={openLogin}>
          Login
        </a>
        <a href="#" onClick={openSignup}>
          signup
        </a>
        {signupStatus || loginStatus ? (
          <div className="main">
            <div className="popup">
              <div onClick={closeModal} className="closing-btn">
                x
              </div>
              {signupStatus ? <Signup /> : ''}
              {loginStatus ? <Login /> : ''}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default Navbar
