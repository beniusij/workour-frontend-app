import React from 'react'
// import Cookies from 'js-cookie'

// const env = require('dotenv').config()
// const cookies = new Cookies()

class Auth extends React.Component {
  // All values set should be loaded from a cookie if present
  // otherwise should default to null or false
  constructor(props) {
    super(props)
    // Set state
    this.state = ({
      isAuthenticated: false,
      isAdmin: false,
      profile: null
    })

    // Bind functions
    this.getProfile = this.getProfile.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  getProfile() {
    return this.state.profile
  }

  isAuthenticated() {
    return this.state.isAuthenticated
  }

  signIn() {
    return false
  }

  handleAuthentication() {
    return false
  }

  signOut() {
    // Clear state
    this.setState({
      isAuthenticated: false,
      isAdmin: false,
      profile: null
    })
  }
}

const authClient = new Auth()

export default authClient