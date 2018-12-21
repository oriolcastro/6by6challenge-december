import React, { Component } from 'react'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import CameraFront from '@material-ui/icons/CameraFront'
import CameraRear from '@material-ui/icons/CameraRear'
import RotateLeft from '@material-ui/icons/RotateLeft'
import RotateRight from '@material-ui/icons/RotateRight'
import Delete from '@material-ui/icons/Delete'

import { isBrowser } from '../admin/services/auth'

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
      idealFacingMode: FACING_MODES.USER,
      isImageMirror: true,
      numOfCameras: 0,
    }
    this.toogleCameraMode = this.toogleCameraMode.bind(this)
  }

  componentDidMount() {
    //On mount check if the device can use the getMediaUser API and also counts the number of cameras available to the browser.
    //If there is only one camera (laptops and some mobiles devices) then the button to toogle the camera mode is not shown.

    if (isBrowser) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('The device can use the app')
        navigator.mediaDevices
          .enumerateDevices()
          .then(devices => {
            let numOfCameras = 0
            devices.forEach(device => {
              if (device.kind === 'videoinput') {
                ++numOfCameras
              }
            })
            console.log('Number of cameras:' + numOfCameras)
            this.setState({ numOfCameras: numOfCameras })
          })
          .catch(err => {
            console.log(err.name + ': ' + err.message)
          })
      } else {
        alert(
          'Ens sap greu però el teu dispositiu no està suportat i la càmera no funcionarà.'
        )
      }
    }
  }

  toogleCameraMode() {
    if (this.state.numOfCameras > 1) {
      if (this.state.idealFacingMode === 'user') {
        this.setState({
          idealFacingMode: FACING_MODES.ENVIRONMENT,
          isImageMirror: false,
        })
      } else if (this.state.idealFacingMode === 'environment') {
        this.setState({
          idealFacingMode: FACING_MODES.USER,
          isImageMirror: true,
        })
      }
    }
  }

  render() {
    const {
      classes,
      isOpen,
      capturedImage,
      openCamera,
      onTakePicture,
      rotateImageLeft,
      rotateImageRight,
      discardPicture,
    } = this.props
    return (
      <Paper>
        {isOpen ? (
          <Camera
            idealFacingMode={this.state.idealFacingMode}
            onTakePhoto={dataUri => {
              onTakePicture(dataUri)
            }}
            idealResolution={{ width: 1980, height: 1980 }}
            imageType={IMAGE_TYPES.JPG}
            isImageMirror={this.state.isImageMirror}
          />
        ) : (
          <div>
            {capturedImage ? (
              <img
                src={capturedImage}
                style={{ width: '100%', display: 'block' }}
                alt="What you have captured"
              />
            ) : (
              <Grid container justify="center" alignItems="center">
                <Grid item onClick={openCamera}>
                  <AddAPhoto
                    color="action"
                    fontSize="large"
                    classes={{ fontSizeLarge: classes.iconPlaceholder }}
                  />
                </Grid>
              </Grid>
            )}
          </div>
        )}
        {isOpen && this.state.numOfCameras > 1 && (
          <Button
            fullWidth
            color="default"
            variant="text"
            onClick={this.toogleCameraMode}
          >
            Canvia a la càmera{' '}
            {this.state.idealFacingMode === 'user' && (
              <CameraRear color="inherit" />
            )}
            {this.state.idealFacingMode === 'environment' && (
              <CameraFront color="inherit" />
            )}
          </Button>
        )}
        {capturedImage && (
          <div style={{ textAlign: 'center' }}>
            <IconButton
              aria-label="Gira a l'esquerra"
              onClick={rotateImageLeft}
            >
              <RotateLeft />
            </IconButton>
            <IconButton aria-label="Elimina la foto" onClick={discardPicture}>
              <Delete />
            </IconButton>
            <IconButton aria-label="Gira a la dreta" onClick={rotateImageRight}>
              <RotateRight />
            </IconButton>
          </div>
        )}
      </Paper>
    )
  }
}

export default withStyles(styles)(MyCamera)
