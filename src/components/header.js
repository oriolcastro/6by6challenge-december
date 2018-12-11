import PropTypes from 'prop-types'
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Typography from '@material-ui/core/Typography'

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
      <div style={{ textAlign: 'center', margin: '8px' }}>
        {data.file ? (
          <Img fixed={data.file.childImageSharp.fixed} />
        ) : (
          <Typography variant="h3" color="primary">
            {data.site.siteMetadata.title}
          </Typography>
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
