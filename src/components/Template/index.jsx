import { Divider, Layout, Menu, Typography, theme } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { HeaderBar as Header } from '../Header'

import {
	AreaChartOutlined,
	FundProjectionScreenOutlined,
	SettingOutlined,
} from '@ant-design/icons'

const { Content, Sider } = Layout
const { Title } = Typography

function Template() {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	const navigate = useNavigate()

	const handleMenuClick = ({ key }) => {
		navigate(key)
	}

	return (
		<Layout hasSider>
			<Sider
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
					top: 0,
					bottom: 0,
				}}
			>
				<div style={{ display: 'flex', padding: '20px 20px' }}>
					<Title style={{ margin: 0, color: '#fff' }} level={3}>
						Manager
					</Title>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					onClick={handleMenuClick}
					items={[
						{
							label: 'Projetos',
							key: '/projetos',
							icon: <FundProjectionScreenOutlined />,
						},
						{
							label: 'Relatórios de Obra',
							key: '/',
							icon: <AreaChartOutlined />,
						},
						{
							label: 'Ajustes',
							key: '/configuracoes',
							icon: <SettingOutlined />,
						},
					]}
				/>
			</Sider>

			<Layout
				style={{
					marginLeft: 200,
				}}
			>
				<Header />
				<Content
					style={{
						margin: '24px 16px 0',
						overflow: 'initial',
					}}
				>
					<div
						style={{
							padding: 24,
							background: colorBgContainer,
						}}
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}

export default Template
