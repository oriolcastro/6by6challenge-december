import { gql } from 'apollo-boost'

export const ADD_POST = gql`
  mutation insert_posts(
    $imgUrl: String!
    $message: String!
    $user_id: String!
  ) {
    insert_posts(
      objects: [{ imgUrl: $imgUrl, message: $message, user_id: $user_id }]
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
