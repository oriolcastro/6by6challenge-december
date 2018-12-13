import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  uri: 'https://jumbocall-6by6december.herokuapp.com/v1alpha1/graphql',
  fetch,
  headers: {
    'X-Hasura-Role': 'anonymous',
    'X-Hasura-Access-Key': process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY,
  },
})
