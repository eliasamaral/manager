import { useQuery } from '@apollo/client'
import { Button, Descriptions, Divider, Space, Spin, Table } from 'antd'
import Alert from 'antd/es/alert/Alert'
import React from 'react'
import { GET_RDO } from '../../schemas'

import { exportPDF } from '../../utility/exportPDF'

const contentStyle = {
	width: '330px',
	height: '200px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
}
const columnsAtividades = [
	{
		title: 'Atividade',
		dataIndex: 'atividade',
		key: 'atividade',
	},
	{
		title: 'Duração',
		dataIndex: 'duracao',
		key: 'duracao',
	},
	{
		title: 'Executante',
		dataIndex: 'executante',
		key: 'executante',
	},
]
const columnsMaoDeObra = [
	{
		title: 'Nome',
		dataIndex: 'nome',
		key: 'nome',
		width: '100px',
	},
	{
		title: 'Função',
		dataIndex: 'funcao',
		key: 'funcao',
	},
	{
		title: 'Início',
		dataIndex: 'inicio',
		key: 'inicio',
		width: '100px',
	},
	{
		title: 'Fim',
		dataIndex: 'fim',
		key: 'fim',
		width: '100px',
	},
]

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
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '750px',
				padding: '30px',
				overflowY: 'scroll',
				height: '85vh',
				backgroundColor: '#f5f5f5cc',
			}}
		>
			<Descriptions
				title="RDO Digital"
				extra={
					<Button type="primary" onClick={() => exportPDF(getRDO)}>
						PDF
					</Button>
				}
			>
				<Descriptions.Item label="Projeto">{getRDO.projeto}</Descriptions.Item>
				<Descriptions.Item label="Líder">
					{getRDO.encarregado}
				</Descriptions.Item>
				<Descriptions.Item label="Local">{getRDO.local}</Descriptions.Item>
				<Descriptions.Item label="Data">
					{getRDO.dataDaProducao}
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

			<Divider orientation={'left'}>Serviços executados</Divider>

			<Table
				dataSource={getRDO.atividades}
				rowKey={(record) => record._id}
				columns={columnsAtividades}
				size="small"
				scroll={{ y: '30vh' }}
			/>

			<Divider orientation={'left'}>Mão de obra</Divider>

			<Table
				dataSource={getRDO.maoDeObra}
				rowKey={(record) => record._id}
				columns={columnsMaoDeObra}
				size="small"
				scroll={{ y: '30vh' }}
			/>

			<Divider orientation={'left'}>Observações</Divider>

			<Alert
				description={getRDO.observacoes}
				type="info"
				style={{ marginBottom: '20px' }}
			/>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: ' repeat(auto-fill, 330px)',
					gap: '10px',
					width: '100%',
				}}
			>
				<div style={contentStyle}>
					<div>Foto 1</div>
				</div>
				<div style={contentStyle}>
					<div>Foto 2</div>
				</div>
			</div>
		</div>
	)
}
