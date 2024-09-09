import React from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { GET_PROJETOS } from '../../Schemas'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { Hammer, NotepadText, DollarSign } from 'lucide-react'
import { Spin, Card, Col, Row, Statistic } from 'antd'
import { InconContainer } from './styles'

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY
const MAP_STYLE_ID = import.meta.env.VITE_MAP_STYLE_ID

export default function Home() {
	const { data, loading } = useQuery(GET_PROJETOS)
	const navigate = useNavigate()

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

	const { getProjetos } = data

	function contarStatus(getProjetos) {
		const contador = {}
		getProjetos.forEach((projeto) => {
			const status = projeto.status
			contador[status] = (contador[status] || 0) + 1
		})
		return contador
	}

	const contagemStatus = contarStatus(getProjetos)

	const handleclick = ({ point }) => {
		navigate(`/projeto/${point.projeto}`)
	}

	return (
		<>
			<Row gutter={16} style={{ marginBottom: '20px' }}>
				<Col span={8}>
					<Card>
						<Statistic
							title="Execução"
							value={contagemStatus[1]}
							valueStyle={{
								color: '#5c42d3',
							}}
							prefix={<Hammer />}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Balanço"
							value={contagemStatus[2]}
							valueStyle={{
								color: '#5c42d3',
							}}
							prefix={<NotepadText />}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Pagamento"
							value={contagemStatus[3]}
							valueStyle={{
								color: '#5c42d3',
							}}
							prefix={<DollarSign />}
						/>
					</Card>
				</Col>
			</Row>

			<APIProvider apiKey={GOOGLE_MAPS_KEY}>
				<div style={{ height: '70vh' }}>
					<Map
						mapId={MAP_STYLE_ID}
						minZoom={8.5}
						defaultCenter={{
							lat: -20.8621244,
							lng: -40.9345395,
						}}
						defaultZoom={10}
					>
						{getProjetos.map((point, index) => (
							<div key={index}>
								<AdvancedMarker
									title={`${point.projeto} ${point.local}`}
									onClick={() => handleclick({ point })}
									position={{
										lat: parseFloat(point.coord.x),
										lng: parseFloat(point.coord.y),
									}}
								>
									{(() => {
										switch (point.status) {
											case 1:
												return (
													<InconContainer>
														<Hammer color="#fff" size={14} />
													</InconContainer>
												)
											case 2:
												return (
													<InconContainer>
														<NotepadText color="#fff" size={14} />
													</InconContainer>
												)
											case 3:
												return (
													<InconContainer>
														<DollarSign color="#fff" size={14} />
													</InconContainer>
												)

											default:
												return null
										}
									})()}
								</AdvancedMarker>
							</div>
						))}
					</Map>
				</div>
			</APIProvider>
		</>
	)
}
