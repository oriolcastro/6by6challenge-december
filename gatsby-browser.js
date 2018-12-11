import './src/styles/styles.css'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './src/apollo/client'
import uuidv1 from 'uuid/v1'

//Wrap the main component with the provedier from Apollo to query the graphql endpoint
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

export const onClientEntry = () => {
  if (typeof window !== 'undefined') {
    if (window.localStorage.getItem('userId')) {
      console.log(
        'There is already a userId stored locally that will be added to state'
      )
    } else {
      console.log(
        'There is not a userId. It will be created, stored locally and added to state'
      )
      const userId = uuidv1()
      window.localStorage.setItem('userId', userId)
    }
  }
}
