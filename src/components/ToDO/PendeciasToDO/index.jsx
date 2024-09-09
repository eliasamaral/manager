import { Button, Form, Input, Popconfirm, Table, Typography } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const { Title } = Typography

const PendeciasToDO = () => {
	const [dataSource, setDataSource] = useState([])
	const [descricao, setDescricao] = useState()

	const handleInputChange = ({ target }) => {
		const { value } = target
		setDescricao(value)
	}

	const [count, setCount] = useState(1)
	const handleDelete = (key) => {
		const newData = dataSource.filter((item) => item.key !== key)
		setDataSource(newData)
	}
	const defaultColumns = [
		{
			title: 'Descrição',
			dataIndex: 'descricao',
			width: '20%',
		},
		{
			title: 'Ações',
			dataIndex: 'operation',
			width: '10%',
			render: (_, record) =>
				dataSource.length >= 1 ? (
					<Popconfirm
						title="Apagar?"
						onConfirm={() => handleDelete(record.key)}
					>
						<DeleteOutlined />
					</Popconfirm>
				) : null,
		},
	]

	const handleAdd = () => {
		const newData = {
			key: count,
			descricao: descricao,
		}
		setDataSource([...dataSource, newData])
		setCount(count + 1)
	}

	return (
		<div>
			<Title level={5}>Pendêcias</Title>

			<Form
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				autoComplete="off"
				style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
				size="small"
			>
				<Form.Item
					name="descricao"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input
						onChange={handleInputChange}
						type="text"
						name="descricao"
						placeholder="Descrição"
						style={{ width: '300px' }}
					/>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" onClick={handleAdd}>
						<PlusOutlined />
					</Button>
				</Form.Item>
			</Form>

			<Table
				size="small"
				bordered
				dataSource={dataSource}
				columns={defaultColumns}
			/>
		</div>
	)
}

export default PendeciasToDO
