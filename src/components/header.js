import PropTypes from 'prop-types'
import React from 'react'
import { StaticQuery, graphql, navigate, Link } from 'gatsby'
import Img from 'gatsby-image'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { isLoggedIn, logout } from '../admin/services/auth'

const Header = () => (
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
      <div style={{ padding: '16px 24px' }}>
        <Link to="/">
          <div style={{ textAlign: 'center' }}>
            {data.file ? (
              <Img fixed={data.file.childImageSharp.fixed} />
            ) : (
              <Typography variant="h3" color="primary" gutterBottom>
                {data.site.siteMetadata.title}
              </Typography>
            )}
          </div>
        </Link>
        {isLoggedIn() && (
          <>
            <Typography variant="body2" style={{ padding: '8px' }}>
              Estàs logejat com a administrador
            </Typography>
            <Button
              href="/"
              onClick={event => {
                event.preventDefault()
                logout(() => navigate(`/admin/login`))
              }}
              color="primary"
              variant="outlined"
              size="small"
              fullWidth
            >
              Surt
            </Button>
          </>
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
