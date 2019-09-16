import React from 'react'
import styles from './InputField.module.scss'

const MandatoryCheckboxField = (props) => {
	const label = props.name + "*"
	const name = props.name.replace(/\s/g, '').toLowerCase()
	return (
		<div className={styles.formControlCheckbox}>
			<input 
				type={props.type} 
				name={name} 
				className={styles.checkbox}
				onChange={props.function}
				required
			/>
			<label htmlFor={name} className={styles.labelCheckbox}>{label}</label>
			{
				props.error.length > 0 &&
				<p className={styles.errorCheckbox}>{props.error}</p>
			}
		</div>
	)
}

export default MandatoryCheckboxField