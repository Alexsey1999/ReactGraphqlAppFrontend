import { gql } from '@apollo/client'

const GET_ALL_LISTS = gql`
  query {
    getAllLists {
      id
      listname
      date
    }
  }
`

export default GET_ALL_LISTS
