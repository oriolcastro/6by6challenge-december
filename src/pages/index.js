import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/layout'
import withRoot from '../withRoot'

const IndexPage = props => {
  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Material-UI
      </Typography>
      <Button variant="contained" color="primary">
        Do nothing button
      </Button>
    </Layout>
  )
}
export default withRoot(IndexPage)
