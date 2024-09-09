import React from 'react'
import { Tabs } from 'antd'

import Serviços from '../../Tabelas/Serviços'
import Materiais from '../../Tabelas/Materiais'
import Pendencias from '../../Tabelas/Pendencias'

function Tab({ data }) {
	const items = [
		{
			key: '1',
			label: `Serviços`,
			children: <Serviços data={data} />,
		},
		{
			key: '2',
			label: `Materiais`,
			children: <Materiais />,
		},
		{
			key: '3',
			label: `Pendências`,
			children: <Pendencias />,
		},
	]

	return <Tabs type="card" size="small" items={items} />
}
export default Tab
