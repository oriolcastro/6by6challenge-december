import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Footer from '../components/footer'
import Header from '../components/header'

const Sidebar = () => (
  <Grid container direction="column" style={{ height: '100%' }}>
    <Grid item style={{ marginTop: '48px' }}>
      <Header />
    </Grid>
    <Grid item style={{ flexGrow: 1 }}>
      <div style={{ margin: '48px' }}>
        <Typography variant="h2">Hello!</Typography>
        <Typography variant="h4">lorem impsum</Typography>
      </div>
    </Grid>
    <Grid item>
      <Footer />
    </Grid>
  </Grid>
)

export default Sidebar
