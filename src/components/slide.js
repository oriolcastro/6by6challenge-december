import React, { forwardRef } from 'react'
import { Image, Transformation } from 'cloudinary-react'
import Typography from '@material-ui/core/Typography'

const messageContainer = {
  position: 'absolute',
  bottom: 0,
  zIndex: 10,
  width: '100%',
  textAlign: 'center',
  padding: '24px',
  backgroundColor: 'rgba(33, 33, 33, 0.8)',
  color: '#fff',
}

const Slide = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      position: 'absolute',
      height: '100vh',
      width: '100vh',
      backgroundColor: '#000',
    }}
  >
    <Image
      responsive
      crop="lpad"
      width="auto"
      height={props.height}
      publicId={props.post.CloudinaryPublicId}
    >
      <Transformation quality="auto" fetchFormat="auto" />
    </Image>
    <div style={messageContainer}>
      <Typography color="inherit" variant="h3">
        {props.post.message}
      </Typography>
    </div>
  </div>
))

export default Slide
