import { gql } from '@apollo/client'

const UPDATE_LIST = gql`
  mutation($id: ID!, $listname: String!) {
    updateList(id: $id, listname: $listname) {
      listname
    }
  }
`

export default UPDATE_LIST
