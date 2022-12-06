import React from 'react'
import { useContext } from 'react'
import { UserAuthContext } from './Contexts'
import axios from 'axios'

const URL = '/auth/user'
function UserProfile() {
  const userAuthContextValue = useContext(UserAuthContext)
  const headers = {
    Authorization: 'Bearer ' + userAuthContextValue.jwt,
  }
  const logOut = () => {
    userAuthContextValue.logout()
    window.location.reload()
  }
  const deleteUser = async () => {
    try {
      await axios
        .delete(`http://localhost:3000${URL}`, {
          headers,
        })
        .then(() => {
          alert(JSON.stringify('deleted!', null, 2))
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
        <p>...</p>
      </div>
      <div className="user-btns">
        <button onClick={logOut}>Logout</button>
        <button onClick={deleteUser}>Delete User</button>
      </div>
    </div>
  )
}

export default UserProfile
