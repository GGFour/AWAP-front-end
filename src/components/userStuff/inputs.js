export const inputs = [
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
    pattern: '',
    errorMessage: 'passwords do not match!',
    required: true,
    loginInput: false,
  },
]
