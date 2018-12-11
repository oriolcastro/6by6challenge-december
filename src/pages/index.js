import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import uuidv1 from 'uuid/v1'
import { Mutation } from 'react-apollo'

import Layout from '../components/layout'
import PostForm from '../components/postform'
import withRoot from '../withRoot'
import { CREATE_USER } from '../apollo/queries'

const isBrowser = typeof window !== `undefined`
if (isBrowser) {
  if (localStorage.getItem('userId')) {
    console.log(
      'There is already a userId stored locally that will be added to state'
    )
  } else {
    console.log(
      'There is not a userId. It will be created, stored locally and added to state'
    )
    const userId = uuidv1()
    localStorage.setItem('userId', userId)
  }
}

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = { userId: localStorage.userId }
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
          variables={{ user_id: localStorage.getItem('userId') }}
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
