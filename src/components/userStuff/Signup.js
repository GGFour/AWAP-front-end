import React, { useState } from 'react'
import Form from './Form'
import axios from 'axios'
import PropTypes from 'prop-types'

const URL = '/auth/signup'

function Signup({ closePopup, openAnother }) {
  const [success, setSuccess] = useState(false)

  Signup.propTypes = {
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
        .then(() => {
          alert('Successfully created!')
          setSuccess(true)
          closePopup()
        })
    } catch (err) {
      alert(JSON.stringify(err.response.data, null, 2))
    }
  }
  return (
    <>
      {success ? (
        <>
          <h1>You are signed up successfully</h1>
        </>
      ) : (
        <>
          <div className="signup-header">
            <h1>Signup</h1>
          </div>
          <Form
            signUp={true}
            handleSubmit={handleSubmit}
            success={success}
          ></Form>
          <div className="button-div">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={() => openAnother()}>
                Login
              </a>
            </p>
          </div>
        </>
      )}
    </>
  )
}

export default Signup
