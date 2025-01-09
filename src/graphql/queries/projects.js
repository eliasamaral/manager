import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
  query Projects {
    projects {
      _id
      project
      location
      activities
    }
  }
`
