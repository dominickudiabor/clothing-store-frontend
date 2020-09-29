import React, { useState } from 'react'

import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

import Button from '@material-ui/core/Button'



import FormInput from '../form-input'

import { useHistory } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {
  toggleSignUpForm,
  googleSignInStart,
  emailSignInStart,
} from '../../redux/actions'

import './sign-in.scss'


const SignIn = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleChange = (event: { target: { value: string; name: string } }) => {
    const { value, name } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleToggle = () => {
    dispatch(toggleSignUpForm())
  }

  const handleReset = () => {
    history.push('/password/requestSignIn')
  }

  const handleEmailSubmit = async (event: { preventDefault: () => void }) => {
    const { email, password } = input
    event.preventDefault()
    if (email && password !== '') {
      dispatch(emailSignInStart(email, password))
      setInput({ email: '', password: '' })
    } else return
  }

  const handleGoogleLogin = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokenId = (response as GoogleLoginResponse).tokenId
    dispatch(googleSignInStart(tokenId))
  }

  return (
    <div className="sign-in">
      <p className="title">Hello</p>
      <div
        role="button"
        onClick={handleToggle}
        tabIndex={0}
        onKeyDown={handleToggle}
        className="signUp"
      >
        Dont have a account? Sign Up{' '}
      </div>

      <form onSubmit={handleEmailSubmit}>
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={input.email}
          handleChange={handleChange}
          required
        />

        <FormInput
          name="password"
          type="password"
          label="Password"
          value={input.password}
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <Button
            className="button"
            variant="contained"
            color="primary"
            type="submit"
          >
            {' '}
            Sign In
          </Button>
          <GoogleLogin
            clientId="246869358979-3qo7e8bos69dqj4a522qmt2euj2dlksh.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className='button'
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
          />
        </div>
      </form>

      <Button onClick={handleReset} className="signUp">
        Forgot Password?
      </Button>
    </div>
  )
}

export default SignIn
