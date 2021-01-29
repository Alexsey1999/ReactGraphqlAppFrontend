import React from 'react'
import * as Yup from 'yup'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'

import UPDATE_LIST from './mutation'
import GET_ALL_LISTS from '../HomePage/query'

import './style.scss'

const EditListModal = ({
  isEditedModalOpened,
  editedListId,
  setIsEditedModalOpened,
}) => {
  const [editList] = useMutation(UPDATE_LIST)

  const formik = useFormik({
    initialValues: { listname: '' },
    validationSchema: Yup.object({
      listname: Yup.string()
        .trim()
        .max(15, 'Имя не может быть больше 15 символов')
        .required('Поле обязательно для заполнения'),
    }),
    onSubmit: ({ listname }) => {
      editList({
        variables: {
          id: editedListId,
          listname,
        },
        refetchQueries: [
          {
            query: GET_ALL_LISTS,
          },
        ],
      })

      setIsEditedModalOpened(false)
    },
  })

  const closeModal = () => {
    formik.resetForm({ listname: '' })
    setIsEditedModalOpened(false)
  }

  return (
    <Modal size="tiny" open={isEditedModalOpened} onClose={closeModal}>
      <Modal.Header>
        Редактирование списка пользователей
        <Icon name="close" className="close-btn" onClick={closeModal} />
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            error={
              formik.touched.listname && formik.errors.listname
                ? formik.errors.listname
                : null
            }
            fluid
            label="Введите название списка"
            placeholder="Название списка"
            value={formik.values.listname}
            name="listname"
            id="form-input-first-name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button style={{ fontWeight: 400 }} type="submit" color="yellow">
            Редактировать
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default EditListModal
