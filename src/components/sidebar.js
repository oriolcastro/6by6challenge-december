import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import QRCode from 'qrcode.react'

import Footer from '../components/footer'
import Header from '../components/header'

const Sidebar = () => (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `}
    render={data => (
      <Grid container direction="column" style={{ height: '100%' }}>
        <Grid item style={{ marginTop: '48px' }}>
          <Header />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <div style={{ margin: '48px' }}>
            <Typography paragraph variant="h2">
              Benvingudes!
            </Typography>
            <Typography variant="h4" paragraph>
              Per a publicar una imatge i que aparegui en pantalla ves a:{' '}
              {data.site.siteMetadata.siteUrl}
            </Typography>
            <QRCode
              value={data.site.siteMetadata.siteUrl}
              renderAs="svg"
              fgColor="#3f51b5"
              size={200}
            />
          </div>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    )}
  />
)

export default Sidebar
