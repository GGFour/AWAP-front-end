import React from 'react'
import { useContext } from 'react'
import { UserAuthContext } from '../Contexts'
import { Link } from 'react-router-dom'
import axios from 'axios'

const URL = '/auth/user'
function UserProfile() {
  const userAuthContextValue = useContext(UserAuthContext)
  const headers = {
    Authorization: 'Bearer ' + userAuthContextValue.jwt,
  }

  function logOut() {
    userAuthContextValue.setJwt(null)
  }
  async function deleteUser() {
    try {
      await axios
        .delete(process.env.REACT_APP_API_ADDRESS + URL, {
          headers,
        })
        .then(() => {
          alert('Successfully deleted!')
          logOut()
        })
    } catch (err) {
      alert(JSON.stringify(err.response.data, null, 2))
    }
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="user-info">
        <p>Username</p>
      </div>
      <div className="user-list">
        <Link to="/diy" className="user-todo">
          Make My Vis
        </Link>
        <Link to="/customvisualizations" className="user-todo">
          View My Vis
        </Link>
      </div>
      <div className="user-btns">
        <button onClick={() => logOut()}>Logout</button>
        <button onClick={() => deleteUser()}>Delete User</button>
      </div>
    </div>
  )
}

export default UserProfile
