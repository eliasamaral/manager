import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { PlusOutlined } from '@ant-design/icons'
import { GET_CONTRATOS } from '../../Schemas'
import CreateContract from '../create-contract'
import { Card, Space, FloatButton, Modal, Spin } from 'antd'

export default function Contracts() {
	const { data, loading } = useQuery(GET_CONTRATOS)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					height: '100vh',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Spin />
			</div>
		)
	}

	const { contratos } = data

	return (
		<Space
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'initial',
			}}
		>
			<Modal
				title="Novo Contrato"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={700}
				footer={null}
			>
				<CreateContract />
			</Modal>

			<Space
				wrap={true}
				style={{
					display: 'flex',
					alignItems: 'initial',
				}}
			>
				{contratos.map((contrato) => (
					<Card
						size="small"
						title={contrato.csd}
						key={contrato.id}
						style={{
							width: 290,
						}}
					>
						<p>N° {contrato.numero} </p>
						<p>Fator K : {contrato.fator}</p>
					</Card>
				))}
			</Space>
			<FloatButton
				tooltip={<div>Adicionar contrato</div>}
				shape="circle"
				type="primary"
				style={{
					right: 94,
				}}
				icon={<PlusOutlined />}
				onClick={showModal}
			/>
		</Space>
	)
}
