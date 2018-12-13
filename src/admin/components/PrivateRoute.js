import React, { Component } from 'react'
import { isLoggedIn } from '../services/auth'
import { navigate } from 'gatsby'

class PrivateRoute extends Component {
  componentDidMount = () => {
    const { location } = this.props
    if (!isLoggedIn() && location.pathname !== `/admin/login`) {
      // If the user is not logged in, redirect to the login page.
      navigate(`/admin/login`)
      return null
    }
  }

  render() {
    const { component: Component, location, ...rest } = this.props
    return isLoggedIn() ? <Component {...rest} /> : null
  }
}

export default PrivateRoute
