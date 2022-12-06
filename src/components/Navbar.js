import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import UserStuff from './UserStuff'

function Navbar() {
  const [togglehome, setToggleHome] = useState(useLocation().pathname == '/')

  const backHome = () => {
    setToggleHome(!togglehome)
  }

  return (
    <>
      <div className="navbar">
        <div className=" navbar-left">
          <Link to={togglehome ? '/visualizations' : '/'} onClick={backHome}>
            {togglehome ? 'Visualizations' : 'Home'}
          </Link>
        </div>
        <div className="hidden"></div>
        <div></div>
        <div className="navbar-right">
          <UserStuff />
        </div>
      </div>
    </>
  )
}
export default Navbar
