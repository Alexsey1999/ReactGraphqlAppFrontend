import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import HomePage from '../HomePage/HomePage'
import ListPage from '../ListPage/ListPage'

import './style.scss'

const App = () => {
  return (
    <div className="app">
      <div className="app-content">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/list/:id">
            <ErrorBoundary>
              <ListPage />
            </ErrorBoundary>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
