import PropTypes from 'prop-types'
import React from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { isLoggedIn, logout } from '../admin/services/auth'

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        file(name: { eq: "logo" }) {
          childImageSharp {
            fixed(height: 75) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <div style={{ textAlign: 'center', margin: '8px' }}>
          {data.file ? (
            <Img fixed={data.file.childImageSharp.fixed} />
          ) : (
            <Typography variant="h3" color="primary">
              {data.site.siteMetadata.title}
            </Typography>
          )}
        </div>
        {isLoggedIn() && (
          <Button
            href="/"
            onClick={event => {
              event.preventDefault()
              logout(() => navigate(`/admin/login`))
            }}
            variant="outlined"
            color="primary"
            size="small"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
            }}
          >
            Surt
          </Button>
        )}
      </div>
    )}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
