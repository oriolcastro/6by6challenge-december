const React = require('react')
const { renderToString } = require('react-dom/server')
const JssProvider = require('react-jss/lib/JssProvider').default
const getPageContext = require('./src/getPageContext').default

import { ApolloProvider } from 'react-apollo'
import { client } from './src/apollo/client'

//Wrap the main component with the provedier from Apollo to query the graphql endpoint
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

function replaceRenderer({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) {
  // Get the context of the page to collected side effects.
  const muiPageContext = getPageContext()

  const bodyHTML = renderToString(
    <JssProvider registry={muiPageContext.sheetsRegistry}>
      {bodyComponent}
    </JssProvider>
  )

  replaceBodyHTMLString(bodyHTML)
  setHeadComponents([
    <style
      type="text/css"
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{
        __html: muiPageContext.sheetsRegistry.toString(),
      }}
    />,
  ])
}

export default replaceRenderer
