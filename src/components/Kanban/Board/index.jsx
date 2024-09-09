import React from 'react'
import { GET_PROJETOS } from '../../../Schemas'
import { useQuery } from '@apollo/client'
import { Container } from './styles'

import List from '../List'

export default function Board() {
	const { data, loading, error } = useQuery(GET_PROJETOS)

	if (loading) {
		return <div>Loading</div>
	}

	if (error) {
		return <div>Error fetching data</div>
	}

	const { getProjetos } = data

	const steps = [
		{
			key: 0,
			title: 'Programada',
			creatable: true,
			content: () => filterProjectsByStatus(0),
		},
		{
			key: 1,
			title: 'Execução',
			creatable: false,
			content: () => filterProjectsByStatus(1),
		},
		{
			key: 2,
			title: 'Balanço',
			creatable: false,
			content: () => filterProjectsByStatus(2),
		},
		{
			key: 3,
			title: 'Pagamento',
			creatable: false,
			content: () => filterProjectsByStatus(3),
		},
		{
			key: 4,
			title: 'Arquivada',
			creatable: false,
			done: true,
			content: () => filterProjectsByStatus(4),
		},
	]

	function filterProjectsByStatus(status) {
		return getProjetos.filter((p) => p.status === status)
	}

	return (
		<Container>
			{steps.map((step) => (
				<List key={step.key} data={step.content()} step={step} />
			))}
		</Container>
	)
}
