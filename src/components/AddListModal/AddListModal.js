import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { Button, Icon, Modal, Form } from 'semantic-ui-react'

import GET_ALL_LISTS from '../HomePage/query'

import './style.scss'

const AddListModal = ({ isModalOpened, setIsModalOpened, createList }) => {
  const formik = useFormik({
    initialValues: { listname: '' },
    validationSchema: Yup.object({
      listname: Yup.string()
        .trim()
        .max(15, 'Имя не может быть больше 15 символов')
        .required('Поле обязательно для заполнения'),
    }),
    onSubmit: ({ listname }) => {
      createList({
        variables: {
          listname,
        },
        refetchQueries: [
          {
            query: GET_ALL_LISTS,
          },
        ],
      })

      setIsModalOpened(false)
    },
  })

  const closeModal = () => {
    setIsModalOpened(false)
    formik.resetForm({ listname: '' })
  }

  return (
    <>
      <Modal size="tiny" open={isModalOpened} onClose={closeModal}>
        <Modal.Header>
          Добавление списка пользователей
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
            <Button style={{ fontWeight: 400 }} type="submit" color="purple">
              Добавить
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default AddListModal
