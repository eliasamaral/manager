import { QuestionCircleOutlined } from '@ant-design/icons'
import { Modal, Space } from 'antd'
import { FloatButton } from 'antd'
import React, { useState } from 'react'

import CalendarioRDO from '../../components/CalendarioRDO'

function RDO() {
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
	return (
		<Space
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'initial',
			}}
		>
			<CalendarioRDO />
			<FloatButton
				icon={<QuestionCircleOutlined />}
				type="primary"
				style={{
					insetInlineEnd: 24,
				}}
				onClick={showModal}
			/>
			<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<a alt="linkRDO" href="https://rdo-digital.vercel.app/generica">
					Link RDO Digital
				</a>
			</Modal>
		</Space>
	)
}

export default RDO
