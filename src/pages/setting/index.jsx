import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Table, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
	GET_ACTIVITY,
	CREATED_ACTIVITY,
	DELETE_ACTIVITY,
	GET_COLLABORATORS,
	DELETE_COLLABORATOR,
	CREATED_COLLABORATOR,
} from '../../schemas'

const FormAtividade = ({ visivel, aoFechar, aoEnviar }) => (
	<Drawer title="Adicionar nova atividade" onClose={aoFechar} open={visivel}>
		<Form onFinish={aoEnviar} autoComplete="off">
			<Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Obrigatório' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="Descrição" name="description">
				<Input />
			</Form.Item>
			<Form.Item label="Valor" name="price" rules={[{ required: true, message: 'Obrigatório' }]}>
				<Input type="number" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
					Adicionar
				</Button>
			</Form.Item>
		</Form>
	</Drawer>
)

const FormColaborador = ({ visivel, aoFechar, aoEnviar }) => (
	<Drawer title="Adicionar novo colaborador" onClose={aoFechar} open={visivel}>
		<Form onFinish={aoEnviar} autoComplete="off">
			<Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Obrigatório' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="HH" name="hh" rules={[{ required: true, message: 'Obrigatório' }]}>
				<Input type="number" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
					Adicionar
				</Button>
			</Form.Item>
		</Form>
	</Drawer>
)

export default function Configuracoes() {
	const [open, setOpen] = useState(false)
	const [openModalColaborador, setOpenModalColaborador] = useState(false)

	const { data: atividadesData, loading: carregandoAtividades, error: erroAtividades } = useQuery(GET_ACTIVITY)
	const { data: colaboradoresData, loading: carregandoColaboradores, error: erroColaboradores } = useQuery(GET_COLLABORATORS)

	const [criarAtividade] = useMutation(CREATED_ACTIVITY, {
		refetchQueries: [GET_ACTIVITY],
		onError: () => notification.error({ message: 'Erro ao criar atividade.' }),
	})

	const [criarColaborador] = useMutation(CREATED_COLLABORATOR, {
		refetchQueries: [GET_COLLABORATORS],
		onError: () => notification.error({ message: 'Erro ao criar colaborador.' }),
	})

	const [deletarAtividade] = useMutation(DELETE_ACTIVITY, {
		refetchQueries: [GET_ACTIVITY],
		onError: () => notification.error({ message: 'Erro ao deletar atividade.' }),
	})

	const [deletarColaborador] = useMutation(DELETE_COLLABORATOR, {
		refetchQueries: [GET_COLLABORATORS],
		onError: () => notification.error({ message: 'Erro ao deletar colaborador.' }),
	})

	const handleDeletarAtividade = (_id) => deletarAtividade({ variables: { _id } })
	const handleDeletarColaborador = (_id) => deletarColaborador({ variables: { _id } })

	if (carregandoAtividades || carregandoColaboradores) return <div>Carregando...</div>
	if (erroAtividades || erroColaboradores) return <div>Houve um erro ao buscar as informações</div>

	const aoFechar = () => {
		setOpen(false)
		setOpenModalColaborador(false)
	}

	const aoEnviarAtividade = (values) => {
		const data = {
			name: values.name,
			description: values.description,
			price: Number.parseFloat(values.price),
		}
		criarAtividade({ variables: data })
		aoFechar()
	}

	const aoEnviarColaborador = (values) => {
		const data = {
			name: values.name,
			hh: Number.parseFloat(values.hh),
		}
		criarColaborador({ variables: data })
		aoFechar()
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '20px',
				}}
			>
				<div style={{ fontSize: '20px' }}>Atividades</div>
				<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>
					Nova atividade
				</Button>
			</div>
			<Table
				dataSource={atividadesData?.activities}
				rowKey={(record) => record._id}
				pagination={false}
				columns={[
					{ title: 'Nome', dataIndex: 'name', key: 'name' },
					{ title: 'Descrição', dataIndex: 'description', key: 'description' },
					{
						title: 'Valor',
						dataIndex: 'price',
						key: 'price',
						render: (valor) => <>R$ {valor}</>,
					},
					{
						title: 'Ações',
						render: ({ _id }) => <Button onClick={() => handleDeletarAtividade(_id)} icon={<DeleteOutlined />} />,
					},
				]}
			/>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '100px',
					marginBottom: '20px',
				}}
			>
				<div style={{ fontSize: '20px' }}>Colaboradores</div>
				<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpenModalColaborador(true)}>
					Novo colaborador
				</Button>
			</div>
			<Table
				dataSource={colaboradoresData?.collaborators}
				rowKey={(record) => record._id}
				pagination={false}
				columns={[
					{ title: 'Nome', dataIndex: 'name', key: 'name' },
					{
						title: 'HH',
						dataIndex: 'hh',
						key: 'hh',
						render: (hh) => <>R$ {hh}</>,
					},
					{
						title: 'Ações',
						render: ({ _id }) => <Button onClick={() => handleDeletarColaborador(_id)} icon={<DeleteOutlined />} />,
					},
				]}
			/>
			<FormAtividade visivel={open} aoFechar={aoFechar} aoEnviar={aoEnviarAtividade} />
			<FormColaborador visivel={openModalColaborador} aoFechar={aoFechar} aoEnviar={aoEnviarColaborador} />
		</>
	)
}
