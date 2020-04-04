import React from 'react'
import RegisterForm from '../../components/form/RegisterForm.jsx'
import styles from './Register.module.scss'

const Register = props => {
  return (
    <div className={styles.page}>
      <RegisterForm history={props.history} />
    </div>
  )
}

export default Register