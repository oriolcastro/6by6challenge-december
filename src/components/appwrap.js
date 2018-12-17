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
    this.state = {
      userId: userId,
      isOpen: false,
      capturedImage: '',
      rotatedImage: '',
    }
    this.takePicture = this.takePicture.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.deletePicture = this.deletePicture.bind(this)
  }

  componentDidMount() {
    console.log(
      `userId in localstorage is ${window.localStorage.getItem('userId')}`
    )
  }

  readDeviceOrientation() {
    if (window.orientation === 180) {
      return 180
    } else if (window.orientation === -90) {
      return 90
    } else if (window.orientation === 90) {
      return 270
    } else {
      return 0
    }
  }

  rotateBase64Image(base64data, givenDegrees, callback) {
    const degrees = givenDegrees % 360
    if (degrees % 90 !== 0 || degrees === 0) {
      callback(base64data)
      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const image = new Image()
    image.src = base64data
    image.onload = function() {
      if (degrees === 180) {
        canvas.width = image.width
        canvas.height = image.height
      } else {
        canvas.width = image.height
        canvas.height = image.width
      }
      ctx.rotate((degrees * Math.PI) / 180)
      if (degrees === 90) {
        ctx.translate(0, -canvas.width)
      } else if (degrees === 180) {
        ctx.translate(-canvas.width, -canvas.height)
      } else if (degrees === 270) {
        ctx.translate(-canvas.height, 0)
      }
      ctx.drawImage(image, 0, 0)
      callback(canvas.toDataURL('image/jpeg'))
    }
  }

  takePicture(data) {
    //TODO: detect window.screen.orientation angle and apply rotation to the image befor store it in state
    const a = this.readDeviceOrientation()
    console.log(a)
    this.rotateBase64Image(data, a, i => {
      this.setState({ capturedImage: data, isOpen: false, rotatedImage: i })
    })
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
        <img src={this.state.rotatedImage} />
      </Grid>
    )
  }
}

export default AppWrap
