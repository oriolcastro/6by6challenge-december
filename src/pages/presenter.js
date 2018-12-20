import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Query } from 'react-apollo'
import { CloudinaryContext } from 'cloudinary-react'

import { GET_POSTS } from '../apollo/queries'
import Sidebar from '../components/sidebar'
import Slideshow from '../components/slideshow'
import withRoot from '../withRoot'

const PresenterPage = () => {
  return (
    <>
      <Grid container wrap="nowrap">
        <Grid item style={{ flexGrow: 1 }}>
          <Sidebar />
        </Grid>
        <Grid item>
          <div style={{ height: '100vh', width: '100vh' }}>
            <CloudinaryContext
              cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
              secure
            >
              <Query query={GET_POSTS} pollInterval={30000}>
                {({ loading, error, data }) => {
                  if (loading) return null
                  if (error) return `Error: ${error}`
                  console.log({ data })
                  return <Slideshow duration={5000} slides={data.posts} />
                }}
              </Query>
            </CloudinaryContext>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default withRoot(PresenterPage)
