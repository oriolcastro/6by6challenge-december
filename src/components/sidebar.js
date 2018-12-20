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
        <Grid item style={{ marginTop: '24px' }}>
          <Header />
        </Grid>
        <Grid item style={{ flex: 1 }}>
          <div
            style={{
              margin: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h4" paragraph>
              Per a publicar una imatge i que aparegui en pantalla ves a:{' '}
              {data.site.siteMetadata.siteUrl}
            </Typography>
            <QRCode
              value={data.site.siteMetadata.siteUrl}
              renderAs="svg"
              fgColor="#673ab7"
              size={200}
              style={{ margin: '24px auto' }}
            />
            <Typography variant="h5" style={{ margin: '24px auto' }}>
              Les publicacions amb contingut ofensiu o que representi un atac
              individual o a qualsevol col·lectiu seran eliminades.
            </Typography>
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
