import React from 'react'
import LoginForm from '../../components/form/LoginForm.js'
import styles from './Login.module.scss'

const Login = props => {
  return (
  	<div className={styles.page}>
  	<h1 className={styles.title}>Workour Admin Panel</h1>
  		<LoginForm history={props.history} />
    </div>
  )
}

export default Login