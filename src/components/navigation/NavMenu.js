import React from 'react';
import NavLink from '../navComponents/NavLink.jsx'
import styles from './NavMenu.module.scss'
import { AuthConsumer } from "../../context/Auth/AuthConsumer"
import NavButton from "../navComponents/navButton";

function NavMenu() {
  const publicMenu = (
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

  const privateMenu = params => (
    <nav className={styles.navContainer}>
      <NavLink to="/">
        Home
      </NavLink>
      <NavButton eventFunction={params}>
        Sign out
      </NavButton>
    </nav>
  )

  return (
    <AuthConsumer>
      {({ user, logout }) => (
        user.isAuth ? privateMenu(logout) : publicMenu
      )}
    </AuthConsumer>
  )
}

export default NavMenu