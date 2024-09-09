import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Input, Span } from './styles'
import { Button, Divider, Table, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import { CREATE_USERS, GET_USERS, DELETE_USER } from '../../Schemas'
import { useMutation, useQuery } from '@apollo/client'

export default function CreateUser() {
	const [createUser] = useMutation(CREATE_USERS)
	const [deleteUser] = useMutation(DELETE_USER)
	const { data, loading } = useQuery(GET_USERS)

	const Schema = z.object({
		name: z.string().nonempty('Defina um nome.'),
		email: z.string().email('Email invalido'),
	})

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(Schema),
	})

	const handleFormSubmit = async (e) => {
		try {
			await createUser({
				variables: { name: e.name, email: e.email, senha: '123' },
				refetchQueries: [GET_USERS],
			})
		} catch (error) {
			console.error('Error during form submission:', error)
		}
	}

	const deledUser = (_id) => {
		deleteUser({
			variables: {
				_id,
			},
			refetchQueries: [GET_USERS],
		})
	}

	const columns = [
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Acão',
			dataIndex: 'ação',
			key: 'ação',
			render: (_, record) => (
				<Popconfirm
					title="Deletar usuário ?"
					onConfirm={() => deledUser(record._id)}
					okText="Sim"
					cancelText="Não"
				>
					<Button danger type="primary">
						<DeleteOutlined />
					</Button>
				</Popconfirm>
			),
		},
	]

	if (loading) return <div>Carregado...</div>

	const { users } = data

	return (
		<Container>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<div>
					<Input {...register('name')} placeholder="Nome" />
					{errors.name && <Span>{errors.name.message}</Span>}
				</div>
				<div>
					<Input
						{...register('email')}
						type="email"
						placeholder="Email Corporativo"
					/>
					{errors.email && <Span>{errors.email.message}</Span>}
				</div>

				<Button htmlType="submit" type="primary">
					Criar
				</Button>
			</form>

			<Divider />
			<Table
				dataSource={users}
				columns={columns}
				rowKey={(record) => record._id}
			/>
		</Container>
	)
}
