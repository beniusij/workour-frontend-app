import React from 'react'
import Cookies from 'universal-cookie'
import {AUTH_TOKEN, USER_EMAIL} from "../../helpers/constants";
import {useMutation} from "@apollo/react-hooks";
import {loginMutation} from "../../helpers/mutations";
import {AuthContext} from "./AuthContext";
import capitalise from "../../helpers/stringUtils";
import {useHistory} from "react-router-dom";

const cookies = new Cookies()

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

  // Set up mutation
  const [login, { data, loading, error }] = useMutation(
    loginMutation,
    {
      onCompleted({login}) {
        // Set cookies
        cookies.set(AUTH_TOKEN, login.Token, {
          secure: false,
          httpOnly: false,
          sameSite: "none"
        })
        cookies.set(USER_EMAIL, login.Email)

        history.push('/')
      }
    }
  )

  // Set error message if there is one
  let errMsg
  if (error) {
    errMsg = 'Error occurred, try again later.'

    if (typeof error.graphQLErrors !== 'undefined') {
      errMsg = capitalise(error.graphQLErrors[0].message)
    }
  }

  // This is called on login form submit
  const authenticate = event => {
    event.preventDefault()

    const emailInput = document.getElementsByName('Email')[0]
    const pswInput = document.getElementsByName('Password')[0]

    login({
      variables: {
        email: emailInput.value,
        password: pswInput.value,
      }
    })
  }

  // Update user state in context if data is available & that's not done yet
  if (typeof data !== "undefined" && !user.isAuth) {
    setUser({
      isAuth: !!data.login.Token,
      email: data.login.Email
    })
  }

  /**
   * Callback for logging user out
   */
  const logout = () => {
    setUser({
      isAuth: false,
      email: null,
    })

    cookies.remove(AUTH_TOKEN)
    cookies.remove(USER_EMAIL)

    history.push('/')
  }

  return (
    <AuthContext.Provider value={({user, authenticate, logout, loading, errMsg})}>
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
    isAuth: !!cookies.get(AUTH_TOKEN),
    email: cookies.get(USER_EMAIL)
  }
}