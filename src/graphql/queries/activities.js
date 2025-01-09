import { gql } from '@apollo/client'

export const GET_ACTIVITY = gql`
  query {
    activities {
      _id
      name
      description
      price
    }
  }
`
