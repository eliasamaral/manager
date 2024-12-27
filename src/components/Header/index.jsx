import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utility/context/authContext'

import { LogoutOutlined } from '@ant-design/icons'
import { Button, Layout, Space, Typography, theme } from 'antd'

const { Header } = Layout
const { Title } = Typography

export function HeaderBar() {
	const navigate = useNavigate()
	const { logout } = useContext(AuthContext)

	const onLogout = () => {
		logout()
		navigate('/')
	}

	const location = useLocation()
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	const routeTitles = {
		'/': 'Dashboard',
		'/projetos/createProject': 'Criar novo projeto',
		'/rdo': 'Relatórios de Obra',
		'/ads': 'ADS Digital',
		'/configurações': 'Configuração',
		'/projetos': 'Projetos',
	}

	const currentRoute = location.pathname
	const currentPageTitle = routeTitles[currentRoute] || ''

	return (
		<Header
			style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				padding: '0 20px ',

				background: colorBgContainer,
			}}
		>
			<Space align="center">
				<Title style={{ margin: '0' }} level={5}>
					{currentPageTitle}
				</Title>
			</Space>
			<Space>
				<Button
					onClick={() => {
						onLogout()
					}}
					icon={<LogoutOutlined />}
				>
					Sair
				</Button>
			</Space>
		</Header>
	)
}
