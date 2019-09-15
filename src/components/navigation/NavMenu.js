import React from 'react';
import NavLink from '../navLink/NavLink.js'
import styles from './NavMenu.module.scss'

function NavMenu() {
  return (
    <nav className={styles.navContainer}>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/signin">
        Sign In
      </NavLink>
      <NavLink to="/signup">
        Sign Up
      </NavLink>
    </nav>
  )
}

export default NavMenu