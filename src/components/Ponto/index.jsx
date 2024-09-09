import React from 'react'
import { usePontoContext } from '../../utility/hooks'

function Ponto(props) {
	const { setPontoInicial } = usePontoContext()

	const { ponto } = props

	const handleClick = (e) => {
		setPontoInicial(e)
	}

	return (
		<div
			onClick={() => handleClick(ponto)}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#1677ff',
				color: '#fff',
				width: '25px',
				height: '25px',
			}}
		>
			{ponto.ref}
		</div>
	)
}

export default Ponto
