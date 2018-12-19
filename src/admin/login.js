import React, { Component } from 'react'
import { navigate } from 'gatsby'

import { handleLogin } from './services/auth'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

class Login extends Component {
  handleSubmit = () => handleLogin(user => navigate(`/admin`))
  render() {
    return (
      <Paper style={{ padding: '24px' }}>
        <Typography align="center" variant="h3" gutterBottom>
          Inici de sessió
        </Typography>
        <Typography variant="body2" paragraph>
          Introdueix les teves dades per accedir al panell d'administrador
        </Typography>
        <Button onClick={this.handleSubmit} variant="contained" color="primary">
          Accedeix
        </Button>
      </Paper>
    )
  }
}

export default Login
