import React, { useContext } from 'react'
import Form from './Form'
import axios from 'axios'
import { UserAuthContext } from '../Contexts'
import PropTypes from 'prop-types'

const URL = '/auth/login'

function Login({ closePopup, openAnother }) {
  const UserAuthContextValue = useContext(UserAuthContext)

  Login.propTypes = {
    closePopup: PropTypes.func,
    openAnother: PropTypes.func,
  }

  async function handleSubmit(e, username, password) {
    try {
      await axios
        .post(`http://localhost:3000${URL}`, {
          username: username.toLowerCase(),
          password: password,
        })
        .then((response) => {
          closePopup()
          UserAuthContextValue.setJwt(response.data.token)
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
          Don&apos;t have an account?{' '}
          <a href="#" onClick={() => openAnother()}>
            Signup
          </a>
        </p>
      </div>
    </>
  )
}

export default Login
