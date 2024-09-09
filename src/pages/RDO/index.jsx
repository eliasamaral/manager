import React from 'react'
import { Space } from 'antd'

import CalendarioRDO from '../../components/CalendarioRDO'

function RDO() {
	return (
		<Space
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'initial',
			}}
		>
			<CalendarioRDO />
		</Space>
	)
}

export default RDO
