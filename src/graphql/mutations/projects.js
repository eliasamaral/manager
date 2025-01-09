import { gql } from '@apollo/client'

export const CREATED_PROJECT = gql`
  mutation($project: String, $location: String, $activities: [String!]) {
    createProject(data: { project: $project, location: $location, activities: $activities }) {
      _id
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation($_id: ID!) {
    deleteProject(_id: $_id)
  }
`
