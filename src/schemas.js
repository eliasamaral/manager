import { gql } from '@apollo/client'

export const GET_RDO = gql`
  query ($_id: ID!) {
    getRDO(_id: $_id) {
      _id
      projeto
      local
      encarregado
      dataDaProducao
      observacoes
      clima {
        manha
        tarde
      }
      maoDeObra {
        nome
        funcao
        inicio
        fim
      }
      atividades {
        atividade
        duracao
        executante
      }
    }
  }
`

export const GET_REPORT = gql`
    query ($id: String!) {
      getReport(id: $id) {
      id
      leader
      project
      report_date
      observations
      afternoon_weather_condition
      morning_weather_condition
      members  {
        description
        end_time
        name
        start_time
      }
      activities {
        id
        description
        duration
      }
    }
  }
`

export const GET_REPORTS = gql`
  query{
    getReports {
       id
       report_date
       leader
    }
  }
`

export const LOGIN_USER_EMAIL = gql`
  mutation login($loginInput: LoginInput) {
    loginFromEmail(loginInput: $loginInput) {
      email
      token
    }
  }
`

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

export const GET_COLLABORATORS = gql`
  query Collaborators {
    collaborators {
      _id
      name
      hh
    }
  }
`

export const DELETE_COLLABORATOR = gql`
  mutation($_id: ID!) {
    deleteCollaborator(_id: $_id)
  }
`

export const CREATED_COLLABORATOR = gql`
  mutation($name: String, $hh: Float) {
    createCollaborator(data: { name: $name, hh: $hh }) {
      _id
    }
  }
`

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

export const CREATED_URL_SIGNED = gql`
  mutation($contentType: String!, $key: String!) {
    generateSignedUrl(contentType: $contentType, key: $key)
  }
`

export const CREATE_REPORT = gql`
  mutation CreateReport(
    $id: String!
    $project: String!
    $leader: String!
    $report_date: String!
    $morning_weather_condition: String!
    $afternoon_weather_condition: String!
    $observations: String
    $activities: [ActivityReportInput]
    $members: [MembersInput]
  ) {
    createReport(data: {
      id: $id
      project: $project
      leader: $leader
      report_date: $report_date
      morning_weather_condition: $morning_weather_condition
      afternoon_weather_condition: $afternoon_weather_condition
      observations: $observations
      activities: $activities
      members: $members
    }) {
      id
    }
  }
`
