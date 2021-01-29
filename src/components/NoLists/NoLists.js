import React from 'react'

import './style.scss'

const NoLists = ({ openModal }) => {
  return (
    <div className="no-lists">
      Списков пользователей еще не создано.
      <span onClick={openModal}>Создать</span>
    </div>
  )
}

export default NoLists
