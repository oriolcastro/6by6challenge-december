import React, { Component } from 'react'
import { getUser } from './services/auth'

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
      </>
    )
  }
}

export default Main
