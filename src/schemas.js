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
        _id
        name
        description
        price
    }
}

`
export const CREATED_ACTIVITY = gql`
  mutation (
    $name: String
    $description: String
    $price: Float
  ) {
    createActivity (
      data: { 
        name: $name
        description: $description
        price: $price
      }
    ) {
      _id
    }
  }
`

export const DELETE_ACTIVITY = gql`
  
  mutation($_id: ID!){
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

mutation ($_id: ID!) {
    deleteCollaborator(_id: $_id)
}

`

export const CREATED_COLLABORATOR = gql`

mutation (
  $name: String
  $hh: Float
) {
    createCollaborator(data: { name: $name, hh: $hh }) {
        _id
       
    }
}
`