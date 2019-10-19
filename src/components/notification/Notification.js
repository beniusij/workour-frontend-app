import React from 'react'
import styles from './Notification.module.scss'

const Notification = (props) => {
  return (
    <p
      className={styles.failure}
    >
      {props.message}
    </p>
  )
}

export default Notification