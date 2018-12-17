import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  uri: process.env.GATSBY_HASURA_GRAPHQL_ENDPOINT,
  fetch,
  headers: {
    'X-Hasura-Role': 'admin',
    'X-Hasura-Access-Key': process.env.GATSBY_HASURA_GRAPHQL_ACCESS_KEY,
  },
})
