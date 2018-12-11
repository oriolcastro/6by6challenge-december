import React, { Component } from 'react'
import { Mutation } from 'react-apollo'

import { CREATE_USER } from '../apollo/queries'
import PostForm from '../components/postform'

class AppWrap extends Component {
  constructor(props) {
    super(props)
    let userId = ' '
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('userId')) {
        userId = window.localStorage.getItem('userId')
      }
    }
    this.state = { userId: userId }
  }

  componentDidMount() {
    console.log(
      `userId in localstorage is ${window.localStorage.getItem('userId')}`
    )
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        variables={{ user_id: this.state.userId }}
      >
        {(insertUser, { data, loading, error }) => (
          <PostForm userId={this.state.userId} insertUser={insertUser} />
        )}
      </Mutation>
    )
  }
}

export default AppWrap
