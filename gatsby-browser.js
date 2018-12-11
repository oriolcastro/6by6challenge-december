import './src/styles/styles.css'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './src/apollo/client'

//Wrap the main component with the provedier from Apollo to query the graphql endpoint
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
