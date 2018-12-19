import React, { Component } from 'react'

import Post from './post'

class PostsList extends Component {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }
  componentDidMount() {
    this.setState({ posts: this.props.posts })
  }
  componentDidUpdate(prevProps) {
    if (this.props.posts.length !== prevProps.posts.length)
      this.setState({ posts: this.props.posts })
  }

  render() {
    const { posts } = this.state
    return (
      <>
        {posts.map(post => (
          <Post
            key={post.id}
            imagePublicId={post.CloudinaryPublicId}
            message={post.message}
            postId={post.id}
            userId={post.user_id}
            refetch={this.props.refetch}
          />
        ))}
      </>
    )
  }
}

export default PostsList
