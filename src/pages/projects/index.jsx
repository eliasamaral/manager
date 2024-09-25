import React, { useState } from 'react'
import { Button, Modal, Checkbox, Form, Input, Radio, Space, Switch, Table } from 'antd'
import { PlusOutlined, DownOutlined } from '@ant-design/icons'

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Descrição',
		dataIndex: 'description',
	},
	{
		title: 'Preço',
		dataIndex: 'price',
	},
]

const activities = [
	{ key: '1', _id: '66f1b81c132d7cebed77909f', name: 'a1', description: 'd1', price: 1 },
	{ key: '2', _id: '66f31d6646b3e47c4a785c5c', name: 'dfg', description: 'fg', price: 77 },
]

export default function Projects() {
	const [isModalOpen, setIsModalOpen] = useState(true)
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
	const onFinish = (values) => {
		console.log('Success:', values)
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
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
			setSelectedActivities(activities.map((activity) => activity._id))
		} else {
			setSelectedActivities([])
		}
	}

	console.log('Selected Activities:', selectedActivities)

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
					Nova projeto
				</Button>
			</div>

			<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
				<Table
					columns={columns}
					dataSource={activities}
					rowSelection={{
						onSelect: (record) => {
							handleSelectedActivities(record)
						},
						onSelectAll: (record) => {
							handleAllSelectedActivities(record)
						},
					}}
				/>
			</Modal>
		</>
	)
}
