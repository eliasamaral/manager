import { useQuery } from '@apollo/client'
import { Button, Descriptions, Divider, Space, Spin, Table } from 'antd'
import Alert from 'antd/es/alert/Alert'
import React from 'react'
import { GET_REPORT } from '../../schemas'

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
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Duração',
		dataIndex: 'duration',
		key: 'duration',
	},
	{
		title: 'Descrição',
		dataIndex: 'description',
		key: 'description',
	},
]
const columnsMaoDeObra = [
	{
		title: 'Nome',
		dataIndex: 'name',
		key: 'name',
		width: '100px',
	},
	{
		title: 'Início',
		dataIndex: 'start_time',
		key: 'start_time',
		width: '100px',
	},
	{
		title: 'Fim',
		dataIndex: 'end_time',
		key: 'end_time',
		width: '100px',
	},
	{
		title: 'Observação',
		dataIndex: 'description',
		key: 'description',
		width: '100px',
	},
]

export default function Reports({ Reportsfiltrado }) {
	const { id } = Reportsfiltrado

	const { loading, data } = useQuery(GET_REPORT, {
		variables: { id },
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

	const { getReport } = data

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
					<Button type="primary" onClick={() => exportPDF(getReport)}>
						PDF
					</Button>
				}
			>
				<Descriptions.Item label="Projeto">
					{getReport.project}
				</Descriptions.Item>
				<Descriptions.Item label="Líder">{getReport.leader}</Descriptions.Item>
				<Descriptions.Item label="Data">
					{getReport.report_date}
				</Descriptions.Item>
			</Descriptions>

			<Descriptions>
				<Descriptions.Item label="Manhã">
					{getReport.morning_weather_condition}
				</Descriptions.Item>
				<Descriptions.Item label="Tarde">
					{getReport.afternoon_weather_condition}
				</Descriptions.Item>
			</Descriptions>

			<Divider orientation={'left'}>Serviços executados</Divider>

			<Table
				dataSource={getReport.activities}
				rowKey={(record) => record.id}
				columns={columnsAtividades}
				size="small"
				scroll={{ y: '30vh' }}
			/>

			<Divider orientation={'left'}>Mão de obra</Divider>

			<Table
				dataSource={getReport.members}
				rowKey={(record) => record._id}
				columns={columnsMaoDeObra}
				size="small"
				scroll={{ y: '30vh' }}
			/>

			<Divider orientation={'left'}>Observações</Divider>

			<Alert
				description={getReport.observations}
				type="info"
				style={{ marginBottom: '20px' }}
			/>

			{/* <div
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
			</div> */}
		</div>
	)
}
