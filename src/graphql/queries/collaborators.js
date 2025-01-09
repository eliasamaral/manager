import { gql } from '@apollo/client'

export const GET_COLLABORATORS = gql`
  query Collaborators {
    collaborators {
      _id
      name
      hh
    }
  }
`
