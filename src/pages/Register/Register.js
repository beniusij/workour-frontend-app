import React from 'react'
import RegisterForm from '../../components/form/register/RegisterForm.js'
import styles from './Register.module.scss'

const Register = props => {
	return (
		<div className={styles.page}>
			<RegisterForm />
		</div>
	)
}

export default Register