import React, { Component } from 'react'
import { navigate } from 'gatsby'
import { handleLogin, isLoggedIn } from './services/auth'

class Login extends Component {
  handleSubmit = () => handleLogin(user => navigate(`/admin`))
  render() {
    return (
      <>
        <h1>Inici de sessió</h1>
        <p>Introdueix les teves dades per accedir al panell d'administrador</p>
        <button onClick={this.handleSubmit}>Accedeix</button>
      </>
    )
  }
}

export default Login
