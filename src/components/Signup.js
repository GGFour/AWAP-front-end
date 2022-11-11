import React from 'react'
import Form from './Form'

function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="signup-header">
        <h1>Signup</h1>
      </div>
      <Form signUp={true} handleSubmit={handleSubmit}></Form>
      <div className="button-div">
        <button>Submit</button>
        <p>
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </>
  )
}

export default Signup
