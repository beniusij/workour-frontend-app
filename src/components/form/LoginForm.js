import React from 'react'
import Button from '../button/Button.js'
import InputField from '../field/InputField.js'
import styles from './Form.module.scss'
import Notification from "../notification/Notification";
import {AuthConsumer} from "../../context/Auth/AuthConsumer";

function LoginForm() {
  const [ error, setError ] = React.useState()
  const [ loading, setLoading ] = React.useState(false)

  // This is called on login form submit
  const authenticate = async (event) => {
    event.preventDefault()

    setLoading(true)

    const loginForm = {
      email: document.getElementsByName('Email')[0],
      password: document.getElementsByName('Password')[0]
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      body: loginForm,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body = await response.json().then((body) => {
      if (typeof body.message !== "undefined") {
        setLoading(false)
        setError(body.message)
      }
    })

  }

  return (
    <AuthConsumer>
      {() => (
        <div className={styles.formContainer} >
          <h2 className={styles.formTitle}>Sign In</h2>

          {
            error &&
            <Notification message={error} />
          }

          <form onSubmit={authenticate}>
            <InputField
              name="Email"
              type="email"
            />
            <InputField
              name="Password"
              type="password"
            />
            <Button type={'submit'} text={loading ? 'Loading...' : 'Sign In'} />
          </form>
        </div>
      )}
    </AuthConsumer>
  )
}

export default LoginForm