import { gql } from '@apollo/client'

export const CREATED_ACTIVITY = gql`
  mutation($name: String, $description: String, $price: Float) {
    createActivity(data: { name: $name, description: $description, price: $price }) {
      _id
    }
  }
`

export const DELETE_ACTIVITY = gql`
  mutation($_id: ID!) {
    deleteActivity(_id: $_id)
  }
`
