import React, { useEffect, useState } from 'react'
import { Calendar, Space, Spin, Tag } from 'antd'
import dayjs from 'dayjs'
import locale from 'antd/es/date-picker/locale/pt_BR'
import 'dayjs/locale/pt-br'

import { useQuery } from '@apollo/client'
import { GET_RDOS } from '../../Schemas'
import RDODigital from '../RDODigital'

function CalendarioRDO() {
	const [RDOselected, setRDOselected] = useState()
	const [RDOfiltrado, setRDOfiltrado] = useState()
	const { data, loading } = useQuery(GET_RDOS)

	useEffect(() => {
		if (data && data.getRDOS) {
			const objetoFiltrado = data.getRDOS.find(
				(objeto) => objeto._id === RDOselected,
			)
			if (objetoFiltrado) {
				setRDOfiltrado(objetoFiltrado)
			}
		}
	}, [data, RDOselected])

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

	const { getRDOS } = data

	return (
		<div style={{display: "flex", flexDirection: "row"}}>
			<Calendar
				style={{
					marginInline: '10px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
				locale={locale}
				cellRender={(date) => {
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
										onClick={() => {
											setRDOselected(item._id)
										}}
									>
										{item.encarregado}
									</Tag>
								</li>
							))}
						</ul>
					) : null
				}}
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
