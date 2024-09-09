import React, { useState } from 'react'
import { Divider, Form, Input, Select } from 'antd'
import MateriaisToDO from '../../ToDO/MateriaisToDO'
import ServicosToDO from '../../ToDO/ServiçosToDO'
import PendeciasToDO from '../../ToDO/PendeciasToDO'

const { Option } = Select

function NovoPonto() {
	const [setRef] = useState()
	const [setTipoPonto] = useState()

	const handleInputChange = ({ target }) => {
		const { name, value } = target

		switch (name) {
			case 'ref':
				setRef(parseFloat(value))
				break
			case 'tipoPonto':
				setTipoPonto(value)
				break
			default:
				break
		}
	}

	return (
		<>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{ remember: false }}
				autoComplete="off"
				style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
				size="small"
			>
				<Form.Item
					name="ref"
					rules={[
						{
							required: true,
							message: 'Precisamos para separar cada ponto',
						},
					]}
					style={{ width: '100px' }}
				>
					<Input
						onChange={handleInputChange}
						type="number"
						placeholder="P1, P2..."
						style={{ width: '100px' }}
					/>
				</Form.Item>

				<Form.Item
					name="tipoPonto"
					rules={[
						{
							required: true,
							message: 'Obrigatório',
						},
					]}
				>
					<Select placeholder="Tipo de serviço" style={{ width: '150px' }}>
						<Option value="instalacao">Instalação</Option>
						<Option value="remocao">Remoção</Option>
					</Select>
				</Form.Item>
			</Form>
			<Divider />
			<ServicosToDO />
			<MateriaisToDO />
			<PendeciasToDO />
		</>
	)
}

export default NovoPonto
