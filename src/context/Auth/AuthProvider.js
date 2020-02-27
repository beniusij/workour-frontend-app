import React from 'react'
// import Cookies from 'universal-cookie'
import {AuthContext} from "./AuthContext";
import {useHistory} from "react-router-dom";

// const cookies = new Cookies()

/**
 * AuthProvider sets up the context with right state
 * and hooks for mutating the state
 *
 * @param props
 * @returns {*}
 */
export const AuthProvider = (props) => {
  // Initialise user state
  const [ user, setUser ] = React.useState(initUserState)
  const history = useHistory()

  let loading = false

  /**
   * Callback for logging user out
   */
  const logout = () => {
    setUser({
      isAuth: false,
      email: null,
    })

    history.push('/')
  }

  return (
    <AuthContext.Provider value={({user, logout, loading})}>
      {props.children}
    </AuthContext.Provider>
  )
}

/**
 * Reads cookies and returns any data found
 *
 * @returns {{isAuth: boolean, email: any}}
 */
function initUserState() {
  return {
    isAuth: false,
    email: ''
  }
}