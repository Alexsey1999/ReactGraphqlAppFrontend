import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link, withRouter } from 'react-router-dom'

import { Button, Confirm, Icon, Table } from 'semantic-ui-react'
import AddUserModal from '../AddUserModal/AddUserModal'
import EditUserModal from '../EditUserModal/EditUserModal'
import UiLoader from '../Loader/Loader'

import { DELETE_USER, GET_LIST } from './query'

import './style.scss'
import EmptyUsers from '../EmptyUsers/EmptyUsers'

const ListPage = (props) => {
  const [isDeletePopupOpened, setIsDeletePopupOpened] = useState(false)
  const [isAddPopupOpened, setIsAddPopupOpened] = useState(false)

  const [openEditModalWithItem, setOpenEditModalWithItem] = useState({
    open: false,
  })

  const [deletedUserId, setDeletedUserId] = useState('')

  const { loading, data } = useQuery(GET_LIST, {
    variables: { id: props.match.params.id },
  })

  const [deleteUser] = useMutation(DELETE_USER)

  const openEditModal = (item) => {
    setOpenEditModalWithItem({
      open: true,
      user: item,
    })
  }

  const deleteUserConfirm = (event, data) => {
    deleteUser({
      variables: {
        id: deletedUserId,
      },
      refetchQueries: [
        {
          query: GET_LIST,
          variables: {
            id: props.match.params.id,
          },
        },
      ],
    })
    setIsDeletePopupOpened(false)
  }

  return (
    <>
      {loading ? (
        <UiLoader />
      ) : (
        <>
          <div className="list-page">
            <div className="list-page-inner">
              <div className="list-page-content">
                <h3 className="list-page-title">{data.getList.listname}</h3>

                {data.getList.users.length ? (
                  <>
                    <Table color="purple">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Имя</Table.HeaderCell>
                          <Table.HeaderCell>Фамилия</Table.HeaderCell>
                          <Table.HeaderCell>Возраст</Table.HeaderCell>
                          <Table.HeaderCell>Город 🌇</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {data.getList.users.map((user) => (
                          <Table.Row key={user.id}>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.surname}</Table.Cell>
                            <Table.Cell>{user.age}</Table.Cell>
                            <Table.Cell>
                              <div className="field-wrapper">
                                <div className="city">{user.city}</div>
                                <div className="icons-wrapper">
                                  <Icon
                                    onClick={() => openEditModal(user)}
                                    className="edit-icon"
                                    name="edit"
                                    size="large"
                                  />
                                  <Icon
                                    onClick={() => {
                                      setIsDeletePopupOpened(true)
                                      setDeletedUserId(user.id)
                                    }}
                                    className="delete-icon"
                                    name="user delete"
                                    size="large"
                                  />
                                </div>
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>

                    <Button
                      className="add-user-btn"
                      color="green"
                      onClick={() => setIsAddPopupOpened(true)}
                    >
                      <Icon name="add user" /> Добавить пользователя
                    </Button>
                  </>
                ) : (
                  <EmptyUsers setIsAddPopupOpened={setIsAddPopupOpened} />
                )}
              </div>
            </div>
          </div>

          <Confirm
            open={isDeletePopupOpened}
            size="tiny"
            content="Вы действительно хотите удалить данного пользователя?"
            onCancel={() => setIsDeletePopupOpened(false)}
            onConfirm={deleteUserConfirm}
          />

          {openEditModalWithItem.open && (
            <EditUserModal
              listId={props.match.params.id}
              openEditModalWithItem={openEditModalWithItem}
              setOpenEditModalWithItem={setOpenEditModalWithItem}
            />
          )}

          <AddUserModal
            listId={props.match.params.id}
            isAddPopupOpened={isAddPopupOpened}
            setIsAddPopupOpened={setIsAddPopupOpened}
          />
        </>
      )}
      <Link to="/">
        <div className="positioned-btn">
          <Button
            className="home-btn"
            color="purple"
            circular
            size="big"
            icon="home"
          />
        </div>
      </Link>
    </>
  )
}

export default withRouter(ListPage)
