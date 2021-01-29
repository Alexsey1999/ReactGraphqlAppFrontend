import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import UiLoader from '../Loader/Loader'
import Lists from '../Lists/Lists'
import NoLists from '../NoLists/NoLists'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { Button } from 'semantic-ui-react'
import AddListModal from '../AddListModal/AddListModal'

import GET_ALL_LISTS from '../HomePage/query'
import CREATE_LIST from '../AddListModal/mutation'
import { DELETE_LIST, DELETE_USERS_FROM_LIST } from '../Lists/mutation'

import './style.scss'

const HomePage = () => {
  const { loading, data = { getAllLists: [] } } = useQuery(GET_ALL_LISTS)
  const [createList, { loading: addListLoading }] = useMutation(CREATE_LIST)

  const [isModalOpened, setIsModalOpened] = useState(false)
  const [deletedListId, setDeleteListId] = useState('')
  const [isDeleteConfirmOpened, setIsDeleteConfirmOpened] = useState(false)

  const [deleteList, { loading: deleteListLoading }] = useMutation(DELETE_LIST)
  const [deleteUsersFromList] = useMutation(DELETE_USERS_FROM_LIST)

  const openModal = () => {
    setIsModalOpened(true)
  }

  const deleteListConfirm = () => {
    deleteList({
      variables: { id: deletedListId },
      refetchQueries: [
        {
          query: GET_ALL_LISTS,
        },
      ],
    })

    deleteUsersFromList({
      variables: { listId: deletedListId },
    })

    setIsDeleteConfirmOpened(false)
  }

  return (
    <ErrorBoundary>
      <div>
        <div className="positioned-btn">
          <Button
            onClick={openModal}
            circular
            color="purple"
            icon="plus"
            size="big"
          />
        </div>

        {loading || addListLoading || deleteListLoading ? (
          <UiLoader />
        ) : data.getAllLists.length ? (
          <Lists
            isDeleteConfirmOpened={isDeleteConfirmOpened}
            setDeleteListId={setDeleteListId}
            setIsDeleteConfirmOpened={setIsDeleteConfirmOpened}
            deleteListConfirm={deleteListConfirm}
            lists={data.getAllLists}
          />
        ) : (
          <NoLists openModal={openModal} />
        )}

        <AddListModal
          createList={createList}
          isModalOpened={isModalOpened}
          setIsModalOpened={setIsModalOpened}
        />
      </div>
    </ErrorBoundary>
  )
}

export default HomePage
