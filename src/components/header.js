import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const Header = ({ siteTitle }) => (
  <div style={{ textAlign: 'center', margin: '8px' }}>
    <Typography variant="h3" color="primary">
      {siteTitle}
    </Typography>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
