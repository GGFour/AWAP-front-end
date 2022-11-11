import React from 'react'
import { useState } from 'react'

function Form(props) {
  const [focused, setFocused] = useState(false)
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

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
      pattern: values.password,
      errorMessage: 'passwords do not match!',
      required: true,
      loginInput: false,
    },
  ]

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleFocus = (e) => {
    setFocused(true)
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={props.handleSubmit}>
          <div>
            {inputs.map((input) => {
              return input.loginInput || props.signUp ? (
                <>
                  <label>{input.label}</label>
                  <input
                    key={input.id}
                    {...input}
                    values={values[input.name]}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={() =>
                      input.name === 'confirmPassword' && setFocused(true)
                    }
                    focused={focused.toString()}
                  />

                  <span className="errorMes">{input.errorMessage}</span>
                </>
              ) : (
                <></>
              )
            })}
          </div>
        </form>
      </div>
    </>
  )
}

export default Form
