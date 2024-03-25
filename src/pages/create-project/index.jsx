import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Space, Table, Divider } from 'antd'
import { Span, Input, Select } from './styles'

import { FileExcelOutlined } from '@ant-design/icons'

import { extractServicesAndMaterialsADS } from '../../utility/process_ads_data'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CREATE_PROJETO, GET_PROJETOS, GET_CONTRATOS } from '../../Schemas'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    sorter: {
      compare: (a, b) => a.codigo - b.codigo,
      multiple: 2,
    },
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Planejado',
    dataIndex: 'qntOrcada',
    key: 'qntOrcada',

    sorter: {
      compare: (a, b) => a.qntOrcada - b.qntOrcada,
      multiple: 2,
    },
  },
]

const Schema = z.object({
  projeto: z.coerce.number(),
  diagrama: z.coerce.number(),
  contrato: z.coerce.number(),
  cidade: z
    .string()
    .nonempty('Item obrigatório.')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
  local: z
    .string()
    .nonempty('Item obrigatório.')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),

  tipo: z
    .string()
    .nonempty('Item obrigatório.')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),

  coord: z.object({
    x: z.string().trim(),
    y: z.string().trim(),
  }),
})

export default function CreateProject() {
  const navigate = useNavigate()
  const [createProjeto, { loading, error }] = useMutation(CREATE_PROJETO)
  const { data: dataContratos, loading: loadingContratos } =
    useQuery(GET_CONTRATOS)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  })

  const handleFormSubmit = async (e) => {
    try {
      const projetoInput = { ...e, srv: dadosFiltrados.servicos }

      await createProjeto({
        variables: { projetoInput },
        refetchQueries: [GET_PROJETOS],
      })

      navigate('/projetos')
    } catch (error) {
      console.error('Error during form submission:', error)
      navigate('/projetos')
    }
  }

  const [dadosFiltrados, setDadosFiltrados] = useState([])
  const [arquivo, setArquivo] = useState(null)

  const handleSelecionarArquivo = (event) => {
    setArquivo(event)
  }

  const handleArmazenarArquivo = () => {
    extractServicesAndMaterialsADS(arquivo)
      .then((value) => {
        setDadosFiltrados(value)
      })
      .catch((erro) => {
        console.error('Erro ao processar o arquivo:', erro)
      })
  }

  if (loading || loadingContratos) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`

  const { contratos } = dataContratos

  return (
    <Space
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'initial',
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Space wrap>
          <div>
            <Input
              {...register('projeto')}
              type="number"
              placeholder="Projeto"
            />
            {errors.projeto && <Span>{errors.projeto.message}</Span>}
          </div>

          <div>
            <Input
              {...register('diagrama')}
              type="number"
              placeholder="Diagrama ou Ordem"
            />
            {errors.diagrama && <Span>{errors.diagrama.message}</Span>}
          </div>

          <div>
            <Select {...register('contrato')}>
              {contratos.map((contrato, index) => (
                <option key={index} value={contrato.numero}>
                  {contrato.numero + ' ' + contrato.csd}
                </option>
              ))}
            </Select>
            {errors.contrato && <Span>{errors.contrato.message}</Span>}
          </div>

          <div>
            <Input {...register('cidade')} type="text" placeholder="Cidade" />
            {errors.cidade && <Span>{errors.cidade.message}</Span>}
          </div>

          <div>
            <Input {...register('local')} type="text" placeholder="Local" />
            {errors.local && <Span>{errors.local.message}</Span>}
          </div>

          <div>
            <Input
              {...register('tipo')}
              status={errors.tipo ? 'error' : 'success'}
              type="text"
              placeholder="Tipo"
            />
            {errors.tipo && <Span>{errors.tipo.message}</Span>}
          </div>

          <div>
            <Input
              {...register('coord.x')}
              status={errors.x ? 'error' : 'success'}
              type="text"
              placeholder="Coordenada X"
            />
            {errors.x && <Span>{errors.x.message}</Span>}
          </div>

          <div>
            <Input
              {...register('coord.y')}
              status={errors.y ? 'error' : 'success'}
              type="text"
              placeholder="Coordenada Y"
            />
            {errors.y && <Span>{errors.y.message}</Span>}
          </div>
        </Space>

        <Divider />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px 0',
            gap: '10px',
          }}
        >
          <Button icon={<FileExcelOutlined />}>
            <label htmlFor="arquivo">Carregar ADS</label>
          </Button>
          <Input
            id="arquivo"
            name="arquivo"
            type="file"
            accept=".xlsx"
            onChange={handleSelecionarArquivo}
            style={{
              display: 'none',
              height: '50px',
              backgroundColor: '#fCfc',
              border: 'none',
            }}
          />

          <Button
            type="primary"
            onClick={handleArmazenarArquivo}
            disabled={!arquivo}
          >
            Filtrar
          </Button>

          <Button type="primary" htmlType="submit">
            Salvar obra
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            justifyContent: 'space-around',
          }}
        >
          <Table
            title={() => 'Serviços'}
            size="small"
            columns={columns}
            dataSource={dadosFiltrados.servicos}
            rowKey={(record) => record.codigo}
            pagination={false}
            scroll={{
              y: 600,
            }}
          />

          <Table
            title={() => 'Materiais'}
            size="small"
            columns={columns}
            dataSource={dadosFiltrados.materiais}
            rowKey={(record) => record.codigo}
            pagination={false}
            scroll={{
              y: 600,
            }}
          />
        </div>
      </form>
    </Space>
  )
}
