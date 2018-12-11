import React from 'react'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/layout'
import AppWrap from '../components/appwrap'
import withRoot from '../withRoot'

const IndexPage = () => (
  <Layout>
    <Typography gutterBottom align="justify" paragraph>
      Fes-te una foto amb la càmera, escriu el teu missatge i publica-la perquè
      aparegui a la pantalla gegant.
    </Typography>
    <AppWrap />
  </Layout>
)

export default withRoot(IndexPage)
