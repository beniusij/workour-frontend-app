import React from 'react'
import Button from '../button/Button.js'
import InputField from '../field/InputField.js'
import styles from './Form.module.scss'
import Notification from "../notification/Notification";
import {AuthConsumer} from "../../context/Auth/AuthConsumer";
import isEmpty from "../../helpers/validation";
import {useHistory} from "react-router-dom";

function LoginForm() {
  const [ error, setError ] = React.useState()
  const [ loading, setLoading ] = React.useState(false)
  const history = useHistory()
  const defaultError = "Error occurred. Please, contact site admin."

  // This is called on login form submit
  const authenticate = async (event) => {
    event.preventDefault()

    setLoading(true)

    const loginForm = {
      email: document.getElementsByName('Email')[0].value,
      password: document.getElementsByName('Password')[0].value
    }

    // TODO update response handling if success/fail
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status !== 200) {
        const body = response.json().then((result) => {
          if (isEmpty(result.error)) {
            setError(result.error)
          } else {
            setError(defaultError)
          }
          
          setLoading(false)
        })
      } else {
        // TODO update context with authenticated context
        history.push("/")
      }
    }).catch((error) => {
      console.log(error)
      setError(defaultError)
      setLoading(false)
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