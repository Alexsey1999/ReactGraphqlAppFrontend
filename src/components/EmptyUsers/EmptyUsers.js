import React from 'react'

import './style.scss'

const EmptyUsers = ({ setIsAddPopupOpened }) => {
  return (
    <div className="empty-users">
      В данном списке еще нет пользователей.{' '}
      <span onClick={() => setIsAddPopupOpened(true)}>Создать</span>
    </div>
  )
}

export default EmptyUsers
