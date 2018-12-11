import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { Mutation } from 'react-apollo'

import Layout from '../components/layout'
import PostForm from '../components/postform'
import withRoot from '../withRoot'
import { CREATE_USER } from '../apollo/queries'

const windowGlobal = typeof window !== 'undefined' && window

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: '' }
  }

  componentDidMount() {
    this.setState({ userId: windowGlobal.localStorage.userId })
  }

  render() {
    return (
      <Layout>
        <Typography gutterBottom align="justify" paragraph>
          Fes-te una foto amb la càmera, escriu el teu missatge i publica-la
          perquè aparegui a la pantalla gegant.
        </Typography>
        <Mutation
          mutation={CREATE_USER}
          variables={{ user_id: this.state.userId }}
        >
          {(insertUser, { data, loading, error }) => (
            <PostForm userId={this.state.userId} insertUser={insertUser} />
          )}
        </Mutation>
      </Layout>
    )
  }
}
export default withRoot(IndexPage)
