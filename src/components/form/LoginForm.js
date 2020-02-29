import React from 'react'
import Button from '../button/Button.js'
import InputField from '../field/InputField.js'
import styles from './Form.module.scss'
import Notification from "../notification/Notification";
import {AuthConsumer} from "../../context/Auth/AuthConsumer";

function LoginForm() {
  return (
    <AuthConsumer>
      {({error, authenticate, loading}) => (
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