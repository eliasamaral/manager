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

export const GET_RDOS = gql`
  query {
    getRDOS {
      _id
      encarregado
      dataDaProducao
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
  query{
  activities {
    id
    nome
    valor
    descricao
  }
}

`
export const CREATED_ACTIVITY = gql`
mutation (
  $nome: String
  $descricao: String
  $valor: Float
  
  ) {
  createActivity (
   data: { nome: $nome
    descricao: $descricao
    valor: $valor}

    ) {
    id
  }
}



`
