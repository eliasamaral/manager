import { PlusOutlined } from '@ant-design/icons'
import { Button, Drawer, Table, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { GET_ACTIVITY, CREATED_ACTIVITY } from '../../schemas'

const columns = [
	{
		title: 'Nome',
		dataIndex: 'nome',
		key: 'nome',
	},
	{
		title: 'Descrição',
		dataIndex: 'descricao',
		key: 'descricao',
	},
	{
		title: 'Valor',
		dataIndex: 'valor',
		key: 'valor',
		render: (valor) => <>R$ {valor}</>,
	},
]

export default function Setting() {
	const [open, setOpen] = useState(false)
	const showDrawer = () => {
		setOpen(true)
	}
	const {
		data: { activities } = {},
		loading,
		error,
	} = useQuery(GET_ACTIVITY)

	const [
		createActivity,
		{
			data: creatActivityData,
			loading: createActivityLoading,
			error: createActivityError,
		},
	] = useMutation(CREATED_ACTIVITY, { refetchQueries: [GET_ACTIVITY] })

	const submit = (props) => createActivity({ variables: props })

	if (loading) {
		return <div>Carregando...</div>
	}

	if (error) {
		return <div>Houve um erro ao buscar as informações</div>
	}

	const onClose = () => {
		setOpen(false)
	}

	const onFinish = (values) => {
		const data = {
			nome: values.nome,
			descricao: values.descricao,
			valor: Number.parseFloat(values.valor),
		}

		submit(data)

		setOpen(false)
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: '20px',
				}}
			>
				<div style={{ fontSize: '20px' }}>Atividades</div>
				<Button icon={<PlusOutlined />} type="primary" onClick={showDrawer}>
					Nova atividade
				</Button>
			</div>
			<Table
				dataSource={activities}
				columns={columns}
				rowKey={(record) => record.id}
			/>

			<Drawer title="Adicionar nova atividade" onClose={onClose} open={open}>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Nome"
						name="nome"
						rules={[
							{
								required: true,
								message: 'Obrigatório',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item label="Descrição" name="descricao">
						<Input />
					</Form.Item>

					<Form.Item
						label="Valor"
						name="valor"
						rules={[
							{
								required: true,
								message: 'Obrigatório',
							},
						]}
					>
						<Input type="number" />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
							Adicionar
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	)
}
