import { gql } from '@apollo/client'

export const DELETE_LIST = gql`
  mutation($id: ID!) {
    deleteList(id: $id) {
      listname
    }
  }
`

export const DELETE_USERS_FROM_LIST = gql`
  mutation($listId: ID!) {
    deleteUsersFromList(listId: $listId) {
      listId
    }
  }
`
