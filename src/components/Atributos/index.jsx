import React from 'react'
import { Space, Typography } from 'antd'

const { Text } = Typography

function atributoItem(title, value) {
	return (
		<div>
			<Typography>
				<Text style={{ fontSize: '16px', fontWeight: 600 }}>{title}</Text>
			</Typography>
			<Typography>
				<Text style={{ fontSize: '14px' }}>{value}</Text>
			</Typography>
		</div>
	)
}

function Atributos(props) {
	const { data } = props

	return (
		<Space
			style={{
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr 1fr ',
				gap: '10px',
				alignItems: 'flex-start',
			}}
		>
			{atributoItem('Projeto', data.projeto)}
			{atributoItem('Diagrama', data.diagrama)}
			{atributoItem('Local', data.local)}
			{atributoItem('Cidade', data.cidade)}
			{atributoItem('Tipo', data.tipo)}
			{atributoItem('Contrato', data.contrato)}
			{atributoItem(
				'Coordenadas',
				data.coord.x.substring(0, 9) + ' ' + data.coord.y.substring(0, 9),
			)}
		</Space>
	)
}

export default Atributos
