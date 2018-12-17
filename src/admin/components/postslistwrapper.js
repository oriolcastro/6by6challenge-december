import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { CloudinaryContext } from 'cloudinary-react'

import PostsList from './postslist'
import { GET_POSTS } from '../../apollo/queries'

class PostsListWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <CloudinaryContext
          cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
          secure
        >
          <Query query={GET_POSTS}>
            {({ loading, error, data, refetch }) => {
              if (loading) return null
              if (error) return `Error: ${error}`
              console.log({ data })
              return <PostsList posts={data.posts} refetch={() => refetch()} />
            }}
          </Query>
        </CloudinaryContext>
      </div>
    )
  }
}

export default PostsListWrapper
