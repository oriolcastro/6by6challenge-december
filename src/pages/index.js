import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Person from '@material-ui/icons/Person'
import Group from '@material-ui/icons/Group'
import TextField from '@material-ui/core/TextField'
import Camera, { FACING_MODES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import ImgPreview from '../components/ImgPreview'
import withRoot from '../withRoot'
import TestImg from '../images/test-image.jpeg'

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCamera: false,
      hasPreview: false,
      idealFacingMode: FACING_MODES.ENVIRONMENT,
    }
    this.openSelfieCamera = this.openSelfieCamera.bind(this)
    this.openGroupCamera = this.openGroupCamera.bind(this)
  }

  openSelfieCamera() {
    this.setState({ showCamera: true, idealFacingMode: FACING_MODES.USER })
  }

  openGroupCamera() {
    this.setState({ showCamera: true })
  }

  render() {
    return (
      <Layout>
        {this.state.showCamera && (
          <Camera idealFacingMode={this.state.idealFacingMode} />
        )}
        <Typography gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet
          tincidunt est. Proin congue finibus tellus, vitae semper arcu
          hendrerit porta. Cras nulla sapien, ornare at venenatis sit amet,
          tristique eget massa.
        </Typography>
        <ImgPreview hasPreview={this.state.hasPreview} imgSrc={TestImg} />
        <Grid container direction="row" justify="center" spacing={16}>
          <Grid item>
            <Button variant="contained" onClick={this.openSelfieCamera}>
              <Person />
              Selfie
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={this.openGroupCamera}>
              <Group /> Grup
            </Button>
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Missatge"
          placeholder="Escriu aquí el teu missatge"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="secondary">
          Publica
        </Button>
      </Layout>
    )
  }
}
export default withRoot(IndexPage)
