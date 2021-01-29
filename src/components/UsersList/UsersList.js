import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import './style.scss'

const UsersList = ({
  id,
  listname,
  date,
  setIsDeleteConfirmOpened,
  setIsEditedModalOpened,
  setDeleteListId,
  setEditedListId,
}) => {
  return (
    <div className="users-list">
      <div className="users-list-content">
        <header>
          <div className="users-list-name">Название списка: {listname}</div>
          <div className="users-list-date">Дата создания: {date}</div>
        </header>

        <div className="users-list-inner">
          <Link to={`/list/${id}`}>
            <div className="icon-list-wrapper">
              <Icon
                name="eye"
                size="large"
                className="eye-icon"
                color="violet"
              />
            </div>
          </Link>

          <div className="icon-list-wrapper">
            <Icon
              name="edit outline"
              size="large"
              className="edit-outline-icon"
              color="yellow"
              onClick={() => {
                setIsEditedModalOpened(true)
                setEditedListId(id)
              }}
            />
          </div>

          <div className="icon-list-wrapper">
            <Icon
              name="delete"
              size="large"
              className="delete-icon"
              color="red"
              onClick={() => {
                setIsDeleteConfirmOpened(true)
                setDeleteListId(id)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersList
