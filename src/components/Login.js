import React from 'react'
import Form from './Form'

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="login-header">
                <h1>Login</h1>
            </div>
            <Form handleSubmit={handleSubmit}></Form>
            <div className="button-div">
                <button>Submit</button>
                <p>
                    Don't have an account? <a href="#">Signup</a>
                </p>
            </div>
        </>
    )
}

export default Login
