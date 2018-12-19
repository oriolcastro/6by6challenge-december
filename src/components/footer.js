import React from 'react'
import Favorite from '@material-ui/icons/Favorite'
import Typography from '@material-ui/core/Typography'

const Footer = () => (
  <div
    style={{
      textAlign: 'center',
      backgroundColor: '#EEEEEE',
      padding: '8px',
    }}
  >
    <Typography>
      Fet amb <Favorite fontSize="inherit" color="error" /> a
      Vilanova i la Geltrú per{' '}
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
