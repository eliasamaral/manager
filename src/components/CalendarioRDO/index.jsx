import React, { useMemo, useState } from 'react'
import { Calendar, Space, Spin, Tag } from 'antd'
import dayjs from 'dayjs'
import locale from 'antd/es/date-picker/locale/pt_BR'
import 'dayjs/locale/pt-br'
import { useQuery } from '@apollo/client'
import { GET_RDOS } from '../../schemas'
import RDODigital from '../RDODigital'

function CalendarioRDO() {
	const [RDOselected, setRDOselected] = useState()
	const {
		data: { getRDOS } = {},
		loading,
	} = useQuery(GET_RDOS)

	const RDOfiltrado = useMemo(() => {
		if (getRDOS) {
			return getRDOS.find((objeto) => objeto._id === RDOselected)
		}
	}, [getRDOS, RDOselected])

	if (loading) {
		return (
			<div className="loading-container">
				<Spin />
			</div>
		)
	}

	const renderCell = (date) => {
		const matchingDateEvents = getRDOS.filter(
			(item) => item.dataDaProducao === dayjs(date).format('DD/MM/YYYY'),
		)

		return matchingDateEvents.length > 0 ? (
			<ul className="events">
				{matchingDateEvents.map((item) => (
					<li key={item._id}>
						<Tag
							color="#108ee9"
							style={{ marginBottom: '5px' }}
							onClick={() => setRDOselected(item._id)}
						>
							{item.encarregado}
						</Tag>
					</li>
				))}
			</ul>
		) : null
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<Calendar
				className="calendar-container"
				locale={locale}
				cellRender={renderCell}
			/>
			{RDOfiltrado && (
				<Space>
					<RDODigital RDOfiltrado={RDOfiltrado} />
				</Space>
			)}
		</div>
	)
}

export default CalendarioRDO
