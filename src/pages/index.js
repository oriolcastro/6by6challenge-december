import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Layout from '../components/layout'
import AppWrap from '../components/appwrap'
import withRoot from '../withRoot'

const IndexPage = () => (
  <Layout>
    <Grid
      container
      alignItems="flex-start"
      justify="space-around"
      spacing="24px"
    >
      <Grid item lg="6" md="8" sm="10" xl="12" xs="12">
        <Typography gutterBottom align="justify" paragraph>
          Fes-te una foto amb la càmera, escriu el teu missatge i publica-la
          perquè aparegui a la pantalla gegant.
        </Typography>
      </Grid>
    </Grid>
    <AppWrap />
  </Layout>
)

export default withRoot(IndexPage)
