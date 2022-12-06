import React, { useState, useContext } from 'react'
import { UserAuthContext } from './Contexts'
import { Link } from 'react-router-dom'
import Signup from './userStuff/Signup'
import Login from './userStuff/Login'
import UserProfile from './userStuff/UserProfile'

function UserStuff() {
  const userAuthContextValue = useContext(UserAuthContext)
  const [signupStatus, setSignupStatus] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [userProfileStatus, setUserProfileStatus] = useState(false)

  const openSignup = () => {
    setLoginStatus(false)
    setSignupStatus(!signupStatus)
  }
  const openLogin = () => {
    setSignupStatus(false)
    setLoginStatus(!loginStatus)
  }
  const openUserProfile = () => {
    setUserProfileStatus(true)
  }
  const closeModal = () => {
    setSignupStatus(false)
    setLoginStatus(false)
    setUserProfileStatus(false)
  }

  return userAuthContextValue.jwt != null ? (
    <>
      <Link to="#" onClick={openUserProfile}>
        Profile
      </Link>
      {userProfileStatus ? (
        <div className="main">
          <div className="popup">
            <div onClick={closeModal} className="closing-btn">
              x
            </div>
            <UserProfile />
          </div>
        </div>
      ) : null}
    </>
  ) : (
    <>
      <Link to="#" onClick={openLogin}>
        Login
      </Link>
      <Link to="#" onClick={openSignup}>
        signup
      </Link>

      {signupStatus || loginStatus ? (
        <div className="main">
          <div className="popup">
            <div onClick={closeModal} className="closing-btn">
              x
            </div>
            {signupStatus ? (
              <Signup closePopup={closeModal} openAnother={openLogin} />
            ) : null}
            {loginStatus ? (
              <Login closePopup={closeModal} openAnother={openSignup} />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
export default UserStuff
