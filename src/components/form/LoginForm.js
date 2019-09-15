import React, { Component } from 'react'
import Button from '../button/Button.js'
import MandatoryInputField from '../field/MandatoryInputField.js'
import styles from './LoginForm.module.scss'

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		const target = event.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
	}

	render () {
		return (
			<div className={styles.formContainer} >
		    	<h2 className={styles.formTitle}>Login</h2>
		    	<form onSubmit={this.handleSubmit}>
			    	<MandatoryInputField 
			    		name="Email" 
			    		type="email" 
			    		function={this.handleChange} 
			    	/>
			    	<MandatoryInputField 
			    		name="Password" 
			    		type="password"
			    		function={this.handleChange} 
			    	/>
			      <Button type={'submit'} text={'Sign In'} />
		    	</form>
		    	
  		</div>
		)
	}
}

export default LoginForm