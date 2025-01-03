import { Calendar, Space, Spin, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'
import 'dayjs/locale/pt-br'
import { useQuery } from '@apollo/client'
import { GET_REPORTS } from '../../schemas'
import Reports from '../Reports'

function CalendarioRDO() {
	const [selectedReport, setSelectedReport] = useState()
	const {
		data: { getReports } = {},
		loading,
	} = useQuery(GET_REPORTS)

	const filteredReport = useMemo(
		() => getReports?.find((report) => report.id === selectedReport),
		[getReports, selectedReport],
	)

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

		if (matchingDateEvents.length === 0) return null

		return (
			<ul className="events">
				{matchingDateEvents.map((item) => (
					<li key={item.id}>
						<Tag
							color="#108ee9"
							style={{ marginBottom: '5px' }}
							onClick={() => setSelectedReport(item.id)}
						>
							{item.leader}
						</Tag>
					</li>
				))}
			</ul>
		)
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<Calendar className="calendar-container" cellRender={renderCell} />
			{filteredReport && (
				<Space style={{ marginLeft: '10px' }}>
					<Reports reportData={filteredReport} />
				</Space>
			)}
		</div>
	)
}

export default CalendarioRDO
