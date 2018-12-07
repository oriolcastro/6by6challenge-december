import React from 'react'
import Favorite from '@material-ui/icons/Favorite'
import Typography from '@material-ui/core/Typography'

const Footer = () => (
  <div style={{ textAlign: 'center' }}>
    <Typography>
      Fet amb <Favorite color="error" fontSize="inherit" /> a Vilanova i la
      Geltrú
    </Typography>
  </div>
)

export default Footer
