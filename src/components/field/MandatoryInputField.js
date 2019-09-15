import React from 'react'
import styles from './InputField.module.scss'

const MandatoryInputField = (props) => {
	const label = props.name + "*"
	const name = props.name.replace(/\s/g, '').toLowerCase()
	return (
		<div className={styles.formControl}>
			<label htmlFor={name}>{label}</label>
			<input 
				type={props.type} 
				name={name} 
				className={styles.input}
				onBlur={props.function}
				required
			/>
		</div>
	)
}

export default MandatoryInputField