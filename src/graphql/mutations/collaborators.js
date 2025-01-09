import { gql } from '@apollo/client'

export const CREATED_COLLABORATOR = gql`
  mutation($name: String, $hh: Float) {
    createCollaborator(data: { name: $name, hh: $hh }) {
      _id
    }
  }
`

export const DELETE_COLLABORATOR = gql`
  mutation($_id: ID!) {
    deleteCollaborator(_id: $_id)
  }
`
