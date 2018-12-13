import React from 'react'
import { Router } from '@reach/router'

import PrivateRoute from './components/PrivateRoute'
import Layout from '../components/layout'
import Main from './main'
import Login from './login'

const AdminPage = () => (
  <Layout>
    <Router>
      <PublicRoute path="/admin">
        <PrivateRoute path="/" component={Main} />
        <Login path="/login" />
      </PublicRoute>
    </Router>
  </Layout>
)

function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default AdminPage
