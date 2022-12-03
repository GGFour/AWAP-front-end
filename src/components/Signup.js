import React from 'react'
import Form from './Form'
import axios from 'axios'

const URL = '/auth/signup'

function Signup() {
  async function handleSubmit(e, username, password) {
    try {
      await axios
        .post(`http://localhost:3000${URL}`, {
          username: username.toLowerCase(),
          password: password,
        })
        .then(() => {
          alert(JSON.stringify('registeration is successful!', null, 2))
        })
    } catch (err) {
      alert(JSON.stringify(err.response.data, null, 2))
    }
  }
  return (
    <>
      <div className="signup-header">
        <h1>Signup</h1>
      </div>
      <Form signUp={true} handleSubmit={handleSubmit}></Form>
      <div className="button-div">
        <p>
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </>
  )
}

export default Signup
