import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@apollo/client'

import { Button, Modal, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { GET_ACTIVITY, GET_PROJECTS, CREATED_PROJECT } from '../../schemas'

const styles = {
	input: {
		boxSizing: 'border-box',
		margin: '0',
		padding: '4px 11px',
		color: 'rgba(0, 0, 0, 0.88)',
		fontSize: '14px',
		position: 'relative',
		display: 'inline-block',
		width: ' 100%',
		transition: 'all 0.2s',
		borderRadius: '6px',
		border: '1px solid #d9d9d9',
		marginBottom: '10px',
		lineHeight: '1.5714285714285714',
	},

	button: {
		boxSizing: 'border-box',
		marginBlock: '20px',
		padding: '4px 11px',
		color: 'rgba(255, 255, 255, 0.88)',
		fontSize: '14px',
		position: 'relative',
		display: 'inline-block',
		transition: 'all 0.2s',
		borderRadius: '6px',
		border: '1px solid #d9d9d9',
		marginBottom: '10px',
		lineHeight: '1.5714285714285714',
		backgroundColor: '#1677ff',
		cursor: 'pointer',
	},
	card: {
		backgroundColor: '#1677ff',
	},
}
const columns = [
	{
		title: 'Nome',
		dataIndex: 'name',
	},
	{
		title: 'Descrição',
		dataIndex: 'description',
	},
	{
		title: 'Preço',
		dataIndex: 'price',
		width: 70,
	},
]
export default function Projects() {
	const { data: atividadesData, loading: carregandoAtividades, error: erroAtividades } = useQuery(GET_ACTIVITY)
	const { data: projetosData, loading: carregandoProjetos, error: erroProjetos } = useQuery(GET_PROJECTS)

	const [createProject, { data: projectCreatedSuccess, loading: projectCreatedLoading, error }] = useMutation(CREATED_PROJECT, {
		refetchQueries: [GET_PROJECTS],
		onError: () => notification.error({ message: 'Erro ao criar projeto.' }),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedActivities, setSelectedActivities] = useState([])
	const showModal = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const handleSelectedActivities = (record) => {
		setSelectedActivities((prevSelected) => {
			if (prevSelected.includes(record._id)) {
				return prevSelected.filter((id) => id !== record._id)
			}
			return [...prevSelected, record._id]
		})
	}

	const handleAllSelectedActivities = (record) => {
		if (record) {
			setSelectedActivities(selectedActivities.map((activity) => activity._id))
		} else {
			setSelectedActivities([])
		}
	}

	const onSubmit = (event) => {
		const newData = {
			project: event.project,
			location: event.location,
			activities: selectedActivities,
		}

		createProject({ variables: newData })
		if (projectCreatedSuccess) {
			setIsModalOpen(false)
		}
	}

	if (carregandoAtividades || carregandoProjetos) return <div>Carregando...</div>

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'end',
					marginBottom: '20px',
				}}
			>
				<Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
					Novo projeto
				</Button>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				{projetosData?.projects.map((e) => (
					<div
						key={e._id}
						style={{
							width: '300px',
							height: '110px',
							border: '1px solid #d9d9d9',
							borderRadius: '10px',
							padding: '20px',
							margin: '5px',
						}}
					>
						<div
							style={{
								fontSize: '16px',
								fontWeight: '500',
								marginBottom: '10px',
							}}
						>
							{e.project}
						</div>
						<div>{e.location}</div>
					</div>
				))}
			</div>

			<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} style={{ display: 'flex' }}>
				<div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
					<div style={{ fontSize: '18px', marginBlock: '20px' }}>Criar novo projeto</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<input {...register('project', { required: true })} placeholder="Projeto" style={styles.input} />

						<input {...register('location', { required: true })} placeholder="Local" style={styles.input} />
						{errors.exampleRequired && <span>Obrigatorio</span>}

						<div style={{ width: '600px' }}>
							<div style={{ fontSize: '17px', marginBlock: '20px' }}>Selecione os serviços a serem executados.</div>
							<Table
								size="small"
								rowKey={(record) => record._id}
								columns={columns}
								dataSource={atividadesData?.activities}
								pagination={false}
								scroll={{
									y: 400,
								}}
								rowSelection={{
									onSelect: (record) => {
										handleSelectedActivities(record)
									},
									onSelectAll: (record) => {
										handleAllSelectedActivities(record)
									},
								}}
							/>
						</div>
						<button type="submit" style={styles.button} disabled={projectCreatedLoading}>
							{projectCreatedLoading ? 'Enviando...' : 'Salvar projeto'}
						</button>
					</form>
				</div>
			</Modal>
		</>
	)
}
