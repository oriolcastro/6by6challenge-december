import React from 'react'
import Paper from '@material-ui/core/Paper'
import Photo from '@material-ui/icons/Photo'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
const styles = {
  imgPreviewContainer: {
    display: 'flex',
    maxWidth: '600px',
    height: '75vw',
  },
  iconPlaceholder: {
    fontSize: '128px',
  },
  imgPreview: {
    objectFit: 'cover',
    width: '100%',
  },
}

const ImgPreview = props => {
  const { hasPreview, imgSrc, classes } = props
  return (
    <Paper>
      {hasPreview ? (
        <div>
          <img src={imgSrc} />
        </div>
      ) : (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.imgPreviewContainer}
        >
          <Grid item>
            <Photo
              color="action"
              fontSize="large"
              classes={{ fontSizeLarge: classes.iconPlaceholder }}
            />
          </Grid>
        </Grid>
      )}
    </Paper>
  )
}

export default withStyles(styles)(ImgPreview)
