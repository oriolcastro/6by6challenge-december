import React, { Component } from 'react'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import Group from '@material-ui/icons/Group'
import Grid from '@material-ui/core/Grid'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  iconPlaceholder: {
    fontSize: theme.typography.fontSize * 10,
    margin: theme.spacing.unit * 6,
  },
})

class MyCamera extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openCamera: false,
      imgData: '',
      isImgTaken: false,
      idealFacingMode: FACING_MODES.USER,
    }
    this.toogleCamera = this.toogleCamera.bind(this)
    this.onTakePhoto = this.onTakePhoto.bind(this)
  }

  toogleCamera() {
    this.setState(prevState => ({
      openCamera: !prevState.openCamera,
    }))
  }

  onTakePhoto(dataUri) {
    console.log(dataUri)
    this.setState({ imgData: dataUri, isImgTaken: true })
    this.toogleCamera()
  }

  render() {
    const { classes } = this.props
    return (
      <Paper>
        {this.state.openCamera ? (
          <div>
            <Camera
              idealFacingMode={this.state.idealFacingMode}
              onTakePhoto={this.onTakePhoto}
              idealResolution={{ width: 1980, height: 1080 }}
              isMaxResolution={true}
              imageType={IMAGE_TYPES.JPG}
            />
          </div>
        ) : (
          <Grid container justify="center" alignItems="center">
            {this.state.imgData ? (
              <div style={{ maxWidth: '600px' }}>
                <img
                  src={this.state.imgData}
                  style={{ width: '100%', display: 'block' }}
                />
              </div>
            ) : (
              <Grid item onClick={this.toogleCamera}>
                <AddAPhoto
                  color="action"
                  fontSize="large"
                  classes={{ fontSizeLarge: classes.iconPlaceholder }}
                />
              </Grid>
            )}
          </Grid>
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(MyCamera)
