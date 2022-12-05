import React, { useContext } from 'react'
import Form from './Form'
import axios from 'axios'
import { UserAuthContext } from './Contexts'

const URL = '/auth/login'

function Login() {
  const UserAuthContextValue = useContext(UserAuthContext)
  async function handleSubmit(e, username, password) {
    try {
      await axios
        .post(`http://localhost:3000${URL}`, {
          username: username.toLowerCase(),
          password: password,
        })
        .then((response) => {
          UserAuthContextValue.login(response.data.token)
          // alert(JSON.stringify('Successfully logged in!', null, 2))
          window.location.reload()
        })
    } catch (err) {
      alert(JSON.stringify(err.response.data, null, 2))
    }
  }
  return (
    <>
      <div className="login-header">
        <h1>Login</h1>
      </div>
      <Form handleSubmit={handleSubmit}></Form>
      <div className="button-div">
        <p>
          Don&apos;t have an account? <a href="#">Signup</a>
        </p>
      </div>
    </>
  )
}

export default Login
