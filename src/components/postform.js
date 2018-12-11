import React, { Component } from 'react'
import axios from 'axios'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import MyCamera from '../components/mycamera'
import { ADD_POST } from '../apollo/queries'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      pictureUrl: '',
      capturedImage: '',
      isOpen: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.uploadPicture = this.uploadPicture.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this.openCamera = this.openCamera.bind(this)
  }

  componentDidMount() {
    console.log(`This is the props userID ${this.props.userId}`)
    //this.props.insertUser()
  }

  openCamera() {
    this.setState({ isOpen: true })
  }

  takePicture(data) {
    this.setState({ capturedImage: data, isOpen: false })
  }

  async uploadPicture() {
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          process.env.CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          file: this.state.capturedImage,
          upload_preset: process.env.CLOUDINARY_CLOUD_PRESET,
        }
      )
      console.log('Picture uploaded to Cloudinary')
      this.setState({ pictureUrl: response.data.url })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  render() {
    return (
      <Mutation mutation={ADD_POST}>
        {(insert_posts, { loading, error }) => (
          <div>
            <MyCamera
              isOpen={this.state.isOpen}
              capturedImage={this.state.capturedImage}
              openCamera={this.openCamera}
              onTakePicture={this.takePicture}
            />
            <form
              onSubmit={async e => {
                e.preventDefault()
                await this.uploadPicture()
                await insert_posts({
                  variables: {
                    imgUrl: this.state.pictureUrl,
                    message: this.state.message,
                    user_id: this.props.userId,
                  },
                })
                console.log('Mutation performed')
                this.setState({
                  message: '',
                  pictureUrl: '',
                  capturedImage: '',
                })
              }}
            >
              <TextField
                fullWidth
                label="Missatge"
                placeholder="Escriu aquí el teu missatge"
                margin="normal"
                variant="outlined"
                value={this.state.message}
                onChange={this.handleChange}
              />
              <Button type="submit" variant="contained" color="primary">
                {loading ? <CircularProgress /> : 'Publica'}
              </Button>
            </form>
            {error && <p>Error</p>}
          </div>
        )}
      </Mutation>
    )
  }
}

export default PostForm
