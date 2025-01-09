import React from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { PrivateRoute } from './routes'
import { AuthProvider } from './utility/context/authContext'

import { GlobalStyle } from './GlobalStyle'

import Template from './components/Template'
import ReportDashboard from './pages/ReportDashboard'
import Login from './pages/login'
import Projects from './pages/projects'
import FormsRDO from './pages/rdo-forms'
import Setting from './pages/setting'

function App() {
	return (
		<AuthProvider>
			<Router>
				<GlobalStyle />
				<Routes>
					<Route element={<PrivateRoute />}>
						<Route element={<Template />}>
							<Route path="/" element={<ReportDashboard />} />
							<Route path="/projetos" element={<Projects />} />
							<Route path="/configuracoes" element={<Setting />} />
						</Route>
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/rdoforms" element={<FormsRDO />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
