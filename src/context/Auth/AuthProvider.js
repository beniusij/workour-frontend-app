import React from 'react'
import {AuthContext} from "./AuthContext";
import {useHistory} from "react-router-dom";
import getCurrentUser from "../../lib/user";
import isEmpty from "../../helpers/validation";

const defaultUser = {isAuth: false}

/**
 * AuthProvider sets up the context with right state
 * and hooks for mutating the state
 *
 * @param props
 * @returns {*}
 */
export const AuthProvider = (props) => {
  // Initialise user state
  const [ user, setUser ] = React.useState(defaultUser)
  const [ error, setError ] = React.useState()
  const [ loading, setLoading ] = React.useState(false)
  const defaultError = "Error occurred. Please, contact site admin."
  const history = useHistory()

  // This is called on login form submit
  const authenticate = async (event) => {
    event.preventDefault()

    setLoading(true)

    const loginForm = {
      email: document.getElementsByName('Email')[0].value,
      password: document.getElementsByName('Password')[0].value
    }

    await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((result) => {
          if (isEmpty(result.error)) {
            setError(result.error)
          } else {
            setError(defaultError)
          }

        })
      } else {
        getCurrentUser().then((data) => {
          if (data !== null) {
            data.isAuth = true
            setUser(data)
          }
        })
        history.push("/")
      }
    }).catch((error) => {
      console.log(error)
      setError(defaultError)
    })

    setLoading(false)
  }

  // TODO: refactor so this get called only once after page refresh
  // TODO: potentially move this out and call on login and context init
  getCurrentUser().then((data) => {
    if (data !== null && typeof data.message === "undefined") {
      data.isAuth = true
    } else {
      data = {isAuth: false}
    }

    if (user.isAuth !== data.isAuth) {
      setUser(data)
    }
  })

  /**
   * Callback for logging user out
   *
   * @returns {Promise<void>}
   */
  const logout = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    }).catch((error) => {
        console.log(error)
      })
    setUser({isAuth: false})

    history.push('/')
  }

  return (
    <AuthContext.Provider value={({user, logout, authenticate, loading, error})}>
      {props.children}
    </AuthContext.Provider>
  )
}