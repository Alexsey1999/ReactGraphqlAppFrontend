import { gql } from '@apollo/client'

const CREATE_LIST = gql`
  mutation($listname: String!) {
    createList(listname: $listname) {
      listname
    }
  }
`

export default CREATE_LIST
