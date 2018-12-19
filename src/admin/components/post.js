import React from 'react'
import { PropTypes } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Mutation } from 'react-apollo'
import { Image, Transformation } from 'cloudinary-react'

import { withStyles } from '@material-ui/core/styles'
import { DELETE_POST, BAN_USER } from '../../apollo/queries'

const styles = theme => ({
  media: {
    height: 300,
  },
  post: {
    marginBottom: theme.spacing.unit * 3,
  },
})

const Post = props => {
  const {
    classes,
    imagePublicId,
    message = 'This is my message',
    postId,
    userId,
  } = props
  return (
    <div className={classes.post}>
      <Card>
        <Image responsive width="auto" crop="scale" publicId={imagePublicId}>
          <Transformation quality="auto" fetchFormat="auto" />
        </Image>
        <CardContent>
          <Typography variant="body2">{message}</Typography>
        </CardContent>
        <CardActions>
          <Mutation mutation={DELETE_POST}>
            {(delete_posts, { loading, error }) => (
              <Button
                size="small"
                color="primary"
                onClick={async e => {
                  e.preventDefault()
                  await delete_posts({ variables: { postId: postId } })
                  props.refetch()
                }}
              >
                Elimina la publicació
              </Button>
            )}
          </Mutation>
          <Mutation mutation={BAN_USER}>
            {(ban_user, { loading, error }) => (
              <Button
                size="small"
                color="primary"
                onClick={async e => {
                  e.preventDefault()
                  await ban_user({ variables: { userId: userId } })
                  props.refetch()
                }}
              >
                Bloqueja l'usuari
              </Button>
            )}
          </Mutation>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(Post)

Post.propTypes = {
  imagePublicId: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  refetch: PropTypes.func,
}
