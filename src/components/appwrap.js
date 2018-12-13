import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Grid from '@material-ui/core/Grid'

import { CREATE_USER } from '../apollo/queries'
import PostForm from '../components/postform'
import MyCamera from '../components/mycamera'

class AppWrap extends Component {
  constructor(props) {
    super(props)
    let userId = ' '
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('userId')) {
        userId = window.localStorage.getItem('userId')
      }
    }
    this.state = { userId: userId, isOpen: false, capturedImage: '' }
    this.takePicture = this.takePicture.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.deletePicture = this.deletePicture.bind(this)
  }

  componentDidMount() {
    console.log(
      `userId in localstorage is ${window.localStorage.getItem('userId')}`
    )
  }
  takePicture(data) {
    this.setState({ capturedImage: data, isOpen: false })
  }

  async deletePicture() {
    this.setState({ capturedImage: '' })
  }

  openCamera() {
    this.setState({ isOpen: true })
  }

  render() {
    return (
      <Grid
        container
        alignItems="flex-start"
        justify="space-around"
        spacing={24}
      >
        <Grid item lg={6} md={8} sm={10} xl={12} xs={12}>
          <MyCamera
            isOpen={this.state.isOpen}
            capturedImage={this.state.capturedImage}
            openCamera={this.openCamera}
            onTakePicture={this.takePicture}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={10} xl={10} xs={12}>
          <Mutation
            mutation={CREATE_USER}
            variables={{ user_id: this.state.userId }}
          >
            {(insertUser, { data, loading, error }) => (
              <PostForm
                userId={this.state.userId}
                insertUser={insertUser}
                capturedImage={this.state.capturedImage}
                deletePicture={this.deletePicture}
              />
            )}
          </Mutation>
        </Grid>
      </Grid>
    )
  }
}

export default AppWrap
