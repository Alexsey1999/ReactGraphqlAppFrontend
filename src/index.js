import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App/App'

import 'semantic-ui-css/semantic.min.css'
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      List: {
        fields: {
          users: {
            merge(existing, incoming) {
              return incoming
            },
          },
        },
      },
      Query: {
        fields: {
          getAllLists: {
            merge(existing, incoming) {
              return incoming
            },
          },
        },
      },
    },
  }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
