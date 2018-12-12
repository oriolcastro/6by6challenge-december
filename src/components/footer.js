import React from 'react'
import Favorite from '@material-ui/icons/Favorite'
import Typography from '@material-ui/core/Typography'

const Footer = () => (
  <div
    style={{ textAlign: 'center', backgroundColor: '#9E9E9E', padding: '8px' }}
  >
    <Typography>
      Fet amb <Favorite color="error" fontSize="inherit" /> a Vilanova i la
      Geltrú per{' '}
      <a
        href="https://okstudio.tech"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {' '}
        Ok! Studio
      </a>
    </Typography>
  </div>
)

export default Footer
