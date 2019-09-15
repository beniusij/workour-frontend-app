import React from 'react'
import LoginForm from '../../components/form/LoginForm.js'
import styles from './Login.module.scss'

function Login() {
  return (
  	<div className={styles.page}>
  	<h1 className={styles.title}>Workour Admin Panel</h1>
  		<LoginForm />
    </div>
  )
}

export default Login