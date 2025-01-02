import { Calendar, Space, Spin, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'
import 'dayjs/locale/pt-br'
import { useQuery } from '@apollo/client'
import { GET_REPORTS } from '../../schemas'
import Reports from '../Reports'

function CalendarioRDO() {
	const [Reportsselected, setReportsselected] = useState()
	const {
		data: { getReports } = {},
		loading,
	} = useQuery(GET_REPORTS)

	const Reportsfiltrado = useMemo(() => {
		if (getReports) {
			return getReports.find((objeto) => objeto.id === Reportsselected)
		}
	}, [getReports, Reportsselected])

	if (loading) {
		return (
			<div className="loading-container">
				<Spin />
			</div>
		)
	}

	const renderCell = (date) => {
		if (!Array.isArray(getReports)) return null

		const matchingDateEvents = getReports.filter(
			(item) => item.report_date === dayjs(date).format('DD/MM/YYYY'),
		)

		return matchingDateEvents.length > 0 ? (
			<ul className="events">
				{matchingDateEvents.map((item) => (
					<li key={item.id}>
						<Tag
							color="#108ee9"
							style={{ marginBottom: '5px' }}
							onClick={() => setReportsselected(item.id)}
						>
							{item.leader}
						</Tag>
					</li>
				))}
			</ul>
		) : null
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<Calendar className="calendar-container" cellRender={renderCell} />
			{Reportsfiltrado && (
				<Space>
					<Reports Reportsfiltrado={Reportsfiltrado} />
				</Space>
			)}
		</div>
	)
}

export default CalendarioRDO
