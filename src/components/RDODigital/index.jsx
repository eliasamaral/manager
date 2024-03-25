import React from 'react'
import {
  Descriptions,
  Divider,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from 'antd'
import { useQuery } from '@apollo/client'
import { GET_RDO } from '../../Schemas'

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    width: '100px',
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
    key: 'descricao',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantidade',
    key: 'quantidade',
    width: '100px',
  },
]

const colorStatus = ['#108ee9', '#ec1c24']

export default function RDODigital({ RDOfiltrado }) {
  const { _id } = RDOfiltrado

  const { loading, data } = useQuery(GET_RDO, {
    variables: { _id },
  })

  if (loading) {
    return (
      <Space
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          width: '600px',
          marginInline: '10px',
        }}
      >
        <Spin />
      </Space>
    )
  }

  const { getRDO } = data

  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
        width: '750px',
        height: '800px',
        padding: '30px',

        backgroundColor: '#f5f5f5cc',
      }}
    >
      <Tag
        color={getRDO.isFinal ? colorStatus[1] : colorStatus[0]}
        style={{ marginBottom: '5px' }}
      >
        {getRDO.isFinal ? 'Final' : 'Parcial'}
      </Tag>
      <Descriptions title="RDO Digital">
        <Descriptions.Item label="Projeto">{getRDO.projeto}</Descriptions.Item>
        <Descriptions.Item label="Diagrama">
          {getRDO.diagrama}
        </Descriptions.Item>
        <Descriptions.Item label="Encarregado">
          {getRDO.encarregado}
        </Descriptions.Item>
        <Descriptions.Item label="Local">{getRDO.local}</Descriptions.Item>
        <Descriptions.Item label="Data">
          {getRDO.dataDaProducao}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Encarregado">
          {getRDO.maoDeObra.encarregado}
        </Descriptions.Item>
        <Descriptions.Item label="Motorista">
          {getRDO.maoDeObra.motorista}
        </Descriptions.Item>
        <Descriptions.Item label="Eletricista">
          {getRDO.maoDeObra.eletricista}
        </Descriptions.Item>
        <Descriptions.Item label="Auxiliar">
          {getRDO.maoDeObra.auxiliar}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Manhã">
          {getRDO.clima.manha}
        </Descriptions.Item>
        <Descriptions.Item label="Tarde">
          {getRDO.clima.tarde}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item>{getRDO.observacoes}</Descriptions.Item>
      </Descriptions>

      <Divider
        orientation={'left'}
        children={<Typography.Text>Ficha equipamento</Typography.Text>}
      ></Divider>

      <Descriptions column={4} size="small">
        <Descriptions.Item label="ESTF">
          {getRDO.fichaTrafo.estf}
        </Descriptions.Item>
        <Descriptions.Item label="N° Serie">
          {getRDO.fichaTrafo.nSerie}
        </Descriptions.Item>
        <Descriptions.Item label="ESTF Sucata">
          {getRDO.fichaTrafo.estfSucata}
        </Descriptions.Item>
        <Descriptions.Item label="N° Sucata">
          {getRDO.fichaTrafo.nSucataSerie}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions size="small">
        <Descriptions.Item label="NA">{getRDO.fichaTrafo.NA}</Descriptions.Item>
        <Descriptions.Item label="NB">{getRDO.fichaTrafo.NB}</Descriptions.Item>
        <Descriptions.Item label="NC">{getRDO.fichaTrafo.NC}</Descriptions.Item>
        <Descriptions.Item label="AB">{getRDO.fichaTrafo.AB}</Descriptions.Item>
        <Descriptions.Item label="AC">{getRDO.fichaTrafo.AC}</Descriptions.Item>
        <Descriptions.Item label="BC">{getRDO.fichaTrafo.BC}</Descriptions.Item>
      </Descriptions>
      <Divider
        orientation={'left'}
        children={<Typography.Text>Serviços executados</Typography.Text>}
      ></Divider>

      <Table
        dataSource={getRDO.servicos}
        rowKey={(record) => record._id}
        columns={columns}
        size="small"
        scroll={{ y: '30vh' }}
        footer={() => 'Valor do relatório: R$ 0.000,00'}
      />
    </Space>
  )
}
