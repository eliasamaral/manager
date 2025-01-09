import { gql } from '@apollo/client'

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
    })
  }
`
