import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Person from '@material-ui/icons/Person'
import Group from '@material-ui/icons/Group'
import TextField from '@material-ui/core/TextField'

import Layout from '../components/layout'
import MyCamera from '../components/mycamera'
import withRoot from '../withRoot'

class IndexPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <Typography gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet
          tincidunt est. Proin congue finibus tellus, vitae semper arcu
          hendrerit porta. Cras nulla sapien, ornare at venenatis sit amet,
          tristique eget massa.
        </Typography>
        <MyCamera />

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
