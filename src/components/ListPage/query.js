import { gql } from '@apollo/client'

export const GET_LIST = gql`
  query($id: ID) {
    getList(id: $id) {
      id
      listname
      date
      users {
        id
        username
        surname
        age
        city
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation($id: ID) {
    deleteUser(id: $id) {
      username
    }
  }
`
