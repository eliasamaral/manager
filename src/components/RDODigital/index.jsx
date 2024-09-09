import React from 'react'
import { Descriptions, Divider, Space, Spin, Table } from 'antd'
import { useQuery } from '@apollo/client'
import { GET_RDO } from '../../Schemas'
import Alert from 'antd/es/alert/Alert'
import image from '../../assets/1.jpg'

const contentStyle = {
	width: '330px',
	height: '200px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
}

const a = {
	dataAtual: '09/09/2024',
	projeto: 'UFV São Pedro',
	local: 'São Pedro da Aldeia',
	encarregado: 'Elias Amaral',
	observacoes: 'Quebra de caminhão.',
	clima: {
		manha: 'Bom',
		tarde: 'Bom',
	},
	dataDaProducao: '09/09/2024',
	atividades: [
		{
			atividade: 'Montagem de andaimes',
			duracao: '06:15',
		},
		{
			atividade: 'Instalação de cabos elétricos',
			duracao: '03:45',
		},
		{
			atividade: 'Pintura externa de paredes',
			duracao: '05:20',
		},
		{
			atividade: 'Soldagem de estruturas metálicas',
			duracao: '07:00',
		},
		{
			atividade: 'Concretagem de laje',
			duracao: '04:45',
		},
		{
			atividade: 'Reparação de tubulações',
			duracao: '03:30',
		},
		{
			atividade: 'Demolição de parede',
			duracao: '02:50',
		},
		{
			atividade: 'Terraplanagem',
			duracao: '06:00',
		},
		{
			atividade: 'Instalação de portas e janelas',
			duracao: '04:10',
		},
		{
			atividade: 'Revisão elétrica geral',
			duracao: '03:25',
		},
	],
	maoDeObra: [
		{
			nome: 'João',
			funcao: 'Pedreiro',
			inicio: '07:00',
			fim: '16:30',
		},
		{
			nome: 'Mariana',
			funcao: 'Engenheira',
			inicio: '08:15',
			fim: '17:45',
		},
		{
			nome: 'Carlos',
			funcao: 'Encarregado',
			inicio: '05:45',
			fim: '15:15',
		},
		{
			nome: 'Ana',
			funcao: 'Mestre de obras',
			inicio: '06:30',
			fim: '16:00',
		},
	],
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
			<Descriptions title="RDO Digital">
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

			<Divider orientation={'left'}>Mão de obra</Divider>

			<Table
				dataSource={a.atividades}
				rowKey={(record) => record._id}
				columns={columnsAtividades}
				size="small"
				scroll={{ y: '30vh' }}
			/>

			<Divider orientation={'left'}>Serviços executados</Divider>

			<Table
				dataSource={a.maoDeObra}
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
					<img
						src={image}
						alt=""
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
				</div>
				<div style={contentStyle}>
					<img
						src={image}
						alt=""
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
				</div>
			</div>
		</div>
	)
}
