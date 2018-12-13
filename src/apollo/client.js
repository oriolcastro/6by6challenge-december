import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  uri: process.env.HASURA_GRAPHQL_ENDPOINT,
  fetch,
  headers: {
    'X-Hasura-Role': 'anonymous',
  },
})
