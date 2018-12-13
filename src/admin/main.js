import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'

import { getUser, logout } from './services/auth'

class Main extends Component {
  render() {
    const user = getUser()
    return (
      <>
        <h1>Your Main App</h1>
        <ul>
          <li>API: {user.api && user.api.apiURL}</li>
          <li>ID: {user.id}</li>
        </ul>
        <hr />

        <a
          href="/"
          onClick={event => {
            event.preventDefault()
            logout(() => navigate(`/admin/login`))
          }}
        >
          Logout
        </a>
      </>
    )
  }
}

export default Main
