import { useState, useEffect, useCallback } from 'react'
import variables from '../styles/variables.scss'

function useForm(stateSchema, validationSchema = {}, callback) {
	const [state, setState] = useState(stateSchema)
	const [disable, setDisable] = useState(true)
	const [isDirty, setIsDirty] = useState(false)

	// Disabled button in initial render
	useEffect(() => {
		setDisable(true)
	}, [])

	// For every change in our state this will be fired
	// To be able to disable the button 
	useEffect(() => {
		if (isDirty) {
			console.log(validateState())
			setDisable(validateState())
		}
	}, [state, isDirty])

	// Disable button if there is an error in state
	const validateState = useCallback(() => {
		const hasErrorInState = Object.keys(validationSchema).some(key => {
			const isInputFieldRequired = validationSchema[key].required
			const stateValue = state[key].value
			const stateError = state[key].error

			return (isInputFieldRequired && !stateValue) || stateError
		})

		return hasErrorInState
	}, [state, validationSchema])

	// Handle every change in every input
	const handleOnChange = useCallback(event => {
		setIsDirty(true)

		const name = event.target.name
		const value = event.target.value

		let error = ''
		if (validationSchema[name].required) {
			if (!value) {
				error = 'This is required field.'
				event.target.style.borderColor = variables.error
			} else {
				if (
					validationSchema[name].validator !== null &&
					typeof validationSchema[name].validator === 'object'
				) {
					if (value && !validationSchema[name].validator.regEx.test(value)) {
						error = validationSchema[name].validator.error
						event.target.style.borderColor = variables.error
					} else {
						event.target.style.borderColor = variables.success
					}
				}
			}
		} else {
			event.target.style.borderColor = variables.success
		}

		setState(prevState => ({
			...prevState,
			[name]: { value, error },
		}))
	}, [validationSchema])

	const handleOnSubmit = useCallback(event => {
		event.preventDefault()

		if (!validateState()) {
			callback(state)
		}
	})

	return { state, disable, handleOnChange, handleOnSubmit }
}

export default useForm