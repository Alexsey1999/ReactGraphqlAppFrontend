import { gql } from '@apollo/client'

const CREATE_USER = gql`
  mutation(
    $username: String!
    $surname: String!
    $age: Int!
    $city: String!
    $listId: ID!
  ) {
    createUser(
      username: $username
      surname: $surname
      age: $age
      city: $city
      listId: $listId
    ) {
      username
    }
  }
`
export default CREATE_USER
