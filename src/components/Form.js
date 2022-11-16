import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

// TODO: move to separate file
const inputs = [
  {
    id: 1,
    name: 'username',
    type: 'text',
    placeholder: 'Type a Username',
    label: 'Username',
    pattern: '^[A-Za-z0-9]{3,15}$',
    errorMessage:
      'Username must have 3-15 characters with no special characters',
    required: true,
    loginInput: true,
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Enter a password',
    label: 'Password',
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    errorMessage:
      'Password should be at least 8 characters long containing at least 1 letter, 1 number and 1 special character!',
    required: true,
    loginInput: true,
  },
  {
    id: 3,
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm pasword',
    label: 'Confirm Password',
    errorMessage: 'passwords do not match!',
    required: true,
    loginInput: false,
  },
]

function Form({ handleSubmit, signUp }) {
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  Form.propTypes = {
    handleSubmit: PropTypes.func,
    signUp: PropTypes.bool,
  }

  function onChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function localHandleSubmit(e) {
    e.preventDefault()
    let newValues = {}
    for (let key in values.keys()) {
      newValues[key] = ''
    }
    setValues(newValues)
    handleSubmit(e)
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={localHandleSubmit}>
          <div>
            {inputs.map((input) => {
              return input.loginInput || signUp ? (
                <>
                  <label>{input.label}</label>
                  <input
                    key={input.id}
                    pattern={input.pattern || values['password']}
                    placeholder={input.placeholder}
                    type={input.type}
                    required={input.required}
                    values={values[input.name]}
                    onChange={onChange}
                    autoFocus
                  />
                  <span className="errorMes">{input.errorMessage}</span>
                </>
              ) : (
                <></>
              )
            })}
          </div>
          <div className="button-div">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Form
