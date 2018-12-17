import { gql } from 'apollo-boost'

export const ADD_POST = gql`
  mutation insert_posts(
    $imgUrl: String!
    $message: String!
    $user_id: String!
    $public_id: String!
  ) {
    insert_posts(
      objects: [
        {
          imgUrl: $imgUrl
          message: $message
          user_id: $user_id
          CloudinaryPublicId: $public_id
        }
      ]
    ) {
      affected_rows
    }
  }
`

export const CREATE_USER = gql`
  mutation insert_users($user_id: String!) {
    insert_users(objects: [{ id: $user_id }]) {
      affected_rows
    }
  }
`

export const DELETE_POST = gql`
  mutation delete_posts($postId: Int!) {
    update_posts(where: { id: { _eq: $postId } }, _set: { isAllowed: false }) {
      affected_rows
    }
  }
`

export const BAN_USER = gql`
  mutation ban_user($userId: String!) {
    update_users(where: { id: { _eq: $userId } }, _set: { isBanned: true }) {
      affected_rows
    }
  }
`

export const GET_POSTS = gql`
  query get_posts {
    posts(
      where: {
        _and: [
          { author: { isBanned: { _eq: false } } }
          { isAllowed: { _eq: true } }
        ]
      }
      order_by: { id: desc_nulls_last }
    ) {
      id
      imgUrl
      message
      user_id
      CloudinaryPublicId
    }
  }
`
