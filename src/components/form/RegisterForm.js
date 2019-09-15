import React from 'react'
import useForm from '../../hooks/UseForm.js'
import Button from '../button/Button.js'
import MandatoryInputField from '../field/MandatoryInputField.js'
import styles from './Form.module.scss'

function RegisterForm() {
	const stateSchema = {
		firstname: { value: '', error: '' },
		lastname: { value: '', error: '' },
		email: { value: '', error: '' },
		password: { value: '', error: '' },
		confirmpassword: { value: '', error: '' },
	}

	const validationStateSchema = {
		firstname: {
			required: true,
			validator: {
				regEx: /^[a-zA-Z]+$/,
				error: 'Invalid first name format',
			},
		},
		lastname: {
			required: true,
			validator: {
				regEx: /^[a-zA-Z]+$/,
				error: 'Invalid first name format',
			},
		},
		email: {
			required: true,
			validator: {
				regEx: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				error: 'Invalid email address',
			},
		},
		password: {
			required: true,
			validator: {
				regEx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
				error: 'Invalid password. It must be minimum of 8 chars, contain a number, upper case & lower case characters',
			},
		},
		confirmpassword: {
			required: true,
			validator: {
				regEx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
				error: 'Invalid password. It must be minimum of 8 chars, contain a number, upper case & lower case characters',
			},
		},
	}

	const onSubmitForm = (state) => {
		alert(JSON.stringify(state, null, 2))
	}

	const { state, disable, handleOnChange, handleOnSubmit } = useForm(
		stateSchema,
		validationStateSchema,
		onSubmitForm
	)

	return (
		<div className={styles.formContainer} >
	    	<h2 className={styles.formTitle}>Sign Up</h2>
	    	<form onSubmit={handleOnSubmit}>
	    		<MandatoryInputField
	    			name="First Name"
	    			type="text"
	    			function={handleOnChange} 
	    		/>
	    		<MandatoryInputField
	    			name="Last Name"
	    			type="text"
	    			function={handleOnChange} 
	    		/>
		    	<MandatoryInputField 
		    		name="Email" 
		    		type="email" 
		    		function={handleOnChange} 
		    	/>
		    	<MandatoryInputField 
		    		name="Password" 
		    		type="password"
		    		function={handleOnChange} 
		    	/>
		    	<MandatoryInputField 
		    		name="Confirm Password" 
		    		type="password"
		    		function={handleOnChange} 
		    	/>
		      <Button type={'submit'} text={'Sign In'} disabled={disable} />
	    	</form>
	    	
		</div>
	)
}

export default RegisterForm