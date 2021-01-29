import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'

import { Button, Icon, Modal, Form } from 'semantic-ui-react'

import { useFormik } from 'formik'

import './style.scss'

import EDIT_USER from './query'
import { GET_LIST } from '../ListPage/query'

const EditUserModal = ({
  setOpenEditModalWithItem,
  openEditModalWithItem,
  listId,
}) => {
  const [editUser] = useMutation(EDIT_USER)

  const formik = useFormik({
    initialValues: {
      username: openEditModalWithItem.user.username || '',
      surname: openEditModalWithItem.user.surname || '',
      age: openEditModalWithItem.user.age || '',
      city: openEditModalWithItem.user.city || '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .max(15, 'Имя не может быть больше 15 символов')
        .required('Поле обязательно для заполнения'),
      surname: Yup.string()
        .trim()
        .max(15, 'Фамилия не может быть больше 15 символов')
        .required('Поле обязательно для заполнения'),
      age: Yup.number()
        .typeError('Не число')
        .min(1, 'Не меньше 1')
        .max(100, 'Не больше 100')
        .required('Поле обязательно для заполнения'),
      city: Yup.string()
        .trim()
        .max(15, 'Город не может быть больше 15 символов')
        .required('Поле обязательно для заполнения'),
    }),
    onSubmit: ({ username, surname, age, city }) => {
      editUser({
        variables: {
          id: openEditModalWithItem.user.id,
          username,
          surname,
          age: Number(age),
          city,
        },
        refetchQueries: [
          {
            query: GET_LIST,
            variables: {
              id: listId,
            },
          },
        ],
      })
      setOpenEditModalWithItem({
        open: false,
      })
    },
  })

  const closeModal = () => {
    formik.resetForm({ username: '', surname: '', age: '', city: '' })
    setOpenEditModalWithItem({
      open: false,
    })
  }

  return (
    <>
      <Modal size="tiny" open={openEditModalWithItem.open} onClose={closeModal}>
        <Modal.Header>
          Редактирование пользователя
          <Icon name="close" className="close-btn" onClick={closeModal} />
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              error={
                formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : null
              }
              fluid
              label="Введите имя"
              placeholder="Имя"
              value={formik.values.username}
              name="username"
              id="form-input-username-name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Input
              error={
                formik.touched.surname && formik.errors.surname
                  ? formik.errors.surname
                  : null
              }
              fluid
              label="Введите фамилию"
              placeholder="Фамилия"
              value={formik.values.surname}
              name="surname"
              id="form-input-surname-name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Input
              error={
                formik.touched.age && formik.errors.age
                  ? formik.errors.age
                  : null
              }
              fluid
              label="Введите возраст"
              placeholder="Возраст"
              value={formik.values.age}
              name="age"
              id="form-input-age-name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Form.Input
              error={
                formik.touched.city && formik.errors.city
                  ? formik.errors.city
                  : null
              }
              fluid
              label="Введите город"
              placeholder="Город"
              value={formik.values.city}
              name="city"
              id="form-input-city-name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button style={{ fontWeight: 400 }} type="submit" color="purple">
              Редактировать
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default EditUserModal
