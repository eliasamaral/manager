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
      members {
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
  query {
    getReports {
      id
      report_date
      leader
    }
  }
`
