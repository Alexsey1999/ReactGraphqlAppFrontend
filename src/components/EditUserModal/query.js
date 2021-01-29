import { gql } from '@apollo/client'

const EDIT_USER = gql`
  mutation(
    $id: ID!
    $username: String!
    $surname: String!
    $age: Int!
    $city: String!
  ) {
    updateUser(
      id: $id
      username: $username
      surname: $surname
      age: $age
      city: $city
    ) {
      username
    }
  }
`

export default EDIT_USER
