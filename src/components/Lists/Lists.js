import React, { useState } from 'react'

import { Confirm } from 'semantic-ui-react'
import UsersList from '../UsersList/UsersList'
import EditListModal from '../EditListModal/EditListModal'

import './style.scss'

const Lists = ({
  lists,
  deleteListConfirm,
  setIsDeleteConfirmOpened,
  setDeleteListId,
  isDeleteConfirmOpened,
}) => {
  const [isEditedModalOpened, setIsEditedModalOpened] = useState(false)

  const [editedListId, setEditedListId] = useState('')

  return (
    <div className="all-lists">
      <div className="lists-title">Списки пользователей</div>
      <div className="lists">
        <div className="lists-wrapper">
          {lists.map((list) => (
            <UsersList
              setIsDeleteConfirmOpened={setIsDeleteConfirmOpened}
              setIsEditedModalOpened={setIsEditedModalOpened}
              setDeleteListId={setDeleteListId}
              setEditedListId={setEditedListId}
              key={list.id}
              {...list}
            />
          ))}
        </div>
      </div>

      <Confirm
        open={isDeleteConfirmOpened}
        size="tiny"
        content="Вы действительно хотите удалить данный список?"
        onCancel={() => setIsDeleteConfirmOpened(false)}
        onConfirm={deleteListConfirm}
      />

      <EditListModal
        isEditedModalOpened={isEditedModalOpened}
        editedListId={editedListId}
        setIsEditedModalOpened={setIsEditedModalOpened}
      />
    </div>
  )
}

export default Lists
