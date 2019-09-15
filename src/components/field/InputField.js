import React from 'react'
import styles from './InputField.module.scss'

const InputField = (props) => {
	return (
		<div className={styles.formControl}>
			<label
				htmlFor={props.name}
				className={styles.label}
		 	>
			 	{props.name}
		 	</label>
			<input 
				type={props.type} 
				name={props.name} 
				className={styles.input}
				attributes={props.attributes}
			/>
		</div>
	)
}

export default InputField