import React from 'react'
import styles from './NavLink.module.scss'

const NavButton = (props) => {
  return (
    <button
      onClick={props.eventFunction}
      className={styles.navButton}
    >
      {props.children}
    </button>
  )
}

export default NavButton