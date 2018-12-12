import React, { Component } from 'react'
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import Paper from '@material-ui/core/Paper'
import AddAPhoto from '@material-ui/icons/AddAPhoto'
import CameraFront from '@material-ui/icons/CameraFront'
import CameraRear from '@material-ui/icons/CameraRear'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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
      idealFacingMode: FACING_MODES.ENVIRONMENT,
    }
    this.toogleCameraMode = this.toogleCameraMode.bind(this)
  }

  toogleCameraMode() {
    if (this.state.idealFacingMode === 'user') {
      this.setState({ idealFacingMode: FACING_MODES.ENVIRONMENT })
    } else if (this.state.idealFacingMode === 'environment') {
      this.setState({ idealFacingMode: FACING_MODES.USER })
    }
  }

  render() {
    const {
      classes,
      isOpen,
      capturedImage,
      openCamera,
      onTakePicture,
    } = this.props
    return (
      <Paper>
        {isOpen ? (
          <div>
            <Camera
              idealFacingMode={this.state.idealFacingMode}
              onTakePhoto={dataUri => {
                onTakePicture(dataUri)
              }}
              idealResolution={{ width: 1980, height: 1080 }}
              isMaxResolution={true}
              imageType={IMAGE_TYPES.JPG}
            />
          </div>
        ) : (
          <Grid container justify="center" alignItems="center">
            {capturedImage ? (
              <img
                src={capturedImage}
                style={{ width: '100%', display: 'block' }}
              />
            ) : (
              <Grid item onClick={openCamera}>
                <AddAPhoto
                  color="action"
                  fontSize="large"
                  classes={{ fontSizeLarge: classes.iconPlaceholder }}
                />
              </Grid>
            )}
          </Grid>
        )}

        {isOpen && (
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
      </Paper>
    )
  }
}

export default withStyles(styles)(MyCamera)
