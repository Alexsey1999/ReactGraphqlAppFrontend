import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Message } from 'semantic-ui-react'

import './style.scss'

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    const errorMessage = new Error(this.state.error).message

    if (this.state.hasError) {
      return (
        <div className="error-ui">
          <div className="error-content">
            <Message negative>
              <Message.Header>
                Что-то пошло не так. Произошла какая-то ошибка
              </Message.Header>
              <p>{errorMessage}</p>
            </Message>

            <div className="btn-wrapper">
              <Link to="/">
                <Button primary>Вернуться на главную страницу</Button>
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
