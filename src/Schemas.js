import { gql } from "@apollo/client";

export const CREATE_PROJETO = gql`
  mutation ($projetoInput: ProjetoInput!) {
    createProjeto(projetoInput: $projetoInput) {
      id
    }
  }
`;

export const GET_CODIGOS = gql`
  query {
    codigos {
      codigo
      descricao
      umb
      preco
      tipo
      fator
      ativo
    }
  }
`;

export const GET_PROJETOS = gql`
  query {
    getProjetos {
      id
      projeto
      local
      status
      coord {
        x
        y
      }
    }
  }
`;

export const GET_RDO = gql`
  query ($_id: ID!) {
    getRDO(_id: $_id) {
      _id
      clima {
        manha
        tarde
      }
      createdAt
      dataDaProducao
      diagrama
      encarregado
      isFinal
      local
      maoDeObra {
        auxiliar
        eletricista
        encarregado
        motorista
      }
      observacoes
      projeto
      servicos {
        _id
        codigo
        descricao
        quantidade
      }
    }
  }
`;

export const GET_PROJETO = gql`
  query ($projeto: Float!) {
    getProjeto(projeto: $projeto) {
      local
      cidade
      contrato
      diagrama
      id
      projeto
      tipo
      status
      coord {
        x
        y
      }
      srv {
        codigo
        descricao
        qntOrcada
      }
      pontos {
        id
        status
        ref
        tipo
        material {
          codigo
          descricao
          id
          qnt
        }
        pendencias {
          createdAt
          descricao
          id
        }
        srv {
          codigo
          descricao
          id
          qntOrcada
        }
      }
    }
  }
`;

export const UPDATE_PROJETO = gql`
  mutation updateProjeto(
    $updateProjetoId: ID!
    $updateProjetoData: ProjetoInput
  ) {
    updateProjeto(id: $updateProjetoId, data: $updateProjetoData)
  }
`;

export const GET_RDOS = gql`
  query {
    getRDOS {
      _id
      encarregado
      dataDaProducao
    }
  }
`;

export const DELETE_PROJETOS = gql`
  mutation ($id: ID!) {
    deleteProjeto(id: $id)
  }
`;

export const DELETE_USER = gql`
  mutation ($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;

export const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      administrador
      token
    }
  }
`;

export const GET_CONTRATOS = gql`
  query {
    contratos {
      id
      numero
      fator
      csd
    }
  }
`;

export const CREATE_CONTRACT = gql`
  mutation ($numero: Float!, $fator: Float!, $csd: String!) {
    createContrato(data: { numero: $numero, fator: $fator, csd: $csd }) {
      id
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation ($id: ID!, $status: Float) {
    updateStatus(id: $id, status: $status) {
      status
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      _id
      name
      email
    }
  }
`;

export const CREATE_USERS = gql`
  mutation ($name: String, $email: String, $senha: String) {
    createUser(data: { name: $name, email: $email, senha: $senha }) {
      _id
    }
  }
`;
export const LOGIN_USER_EMAIL = gql`
  mutation login($loginInput: LoginInput) {
    loginFromEmail(loginInput: $loginInput) {
      email
      token
    }
  }
`;
