import React, { Component } from 'react'
import axios from 'axios'
import { Mutation } from 'react-apollo'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'

import { ADD_POST } from '../apollo/queries'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      pictureUrl: '',
      isLoading: false,
      openSnackbar: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.uploadPicture = this.uploadPicture.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
  }

  componentDidMount() {
    console.log(`This is the props userID ${this.props.userId}`)
    this.props.insertUser()
  }

  async uploadPicture() {
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          process.env.GATSBY_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          file: this.props.capturedImage,
          upload_preset: process.env.GATSBY_CLOUDINARY_CLOUD_PRESET,
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

  handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ openSnackbar: false })
  }

  render() {
    return (
      <>
        <Mutation mutation={ADD_POST}>
          {(insert_posts, { loading, error }) => (
            <form
              onSubmit={async e => {
                e.preventDefault()
                this.setState({ isLoading: true })
                await this.uploadPicture()
                await insert_posts({
                  variables: {
                    imgUrl: this.state.pictureUrl,
                    message: this.state.message,
                    user_id: this.props.userId,
                  },
                })
                console.log('Post submited to the server')
                this.setState({
                  message: '',
                  pictureUrl: '',
                  isLoading: false,
                  openSnackbar: true,
                })
                await this.props.deletePicture()
              }}
            >
              <TextField
                disabled={this.props.capturedImage ? false : true}
                fullWidth
                required
                label="Missatge"
                placeholder="Escriu aquí el teu missatge"
                margin="normal"
                variant="outlined"
                value={this.state.message}
                onChange={this.handleChange}
              />
              <Button
                disabled={this.state.isLoading}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {this.state.isLoading ? (
                  <CircularProgress size={30} />
                ) : (
                  'Publica'
                )}
              </Button>
            </form>
          )}
        </Mutation>
        <Snackbar
          open={this.state.openSnackbar}
          onClose={this.handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={4000}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={
            <span id="message-id">
              Publicat correctament. En breus apareixerà en pantalla.
            </span>
          }
        />
      </>
    )
  }
}

export default PostForm
