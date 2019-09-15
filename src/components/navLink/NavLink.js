import React from 'react'
import {Link} from 'react-router-dom'
import styles from './NavLink.module.scss'

const NavLink = (props) => {
	return (
		<Link 
			to={props.to}
			className={styles.navLink}
		>
			{props.children}
		</Link>
	)
}

export default NavLink