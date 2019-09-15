import React from 'react'
import styles from './Button.module.scss'

const Button = (props) => {
  return (
    <button className={styles.btn} type={props.type}>
      {props.text}
    </button>
  )
}

export default Button