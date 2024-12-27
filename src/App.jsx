import React from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { PrivateRoute } from './routes'
import { AuthProvider } from './utility/context/authContext'

import { GlobalStyle } from './GlobalStyle'

import Tamplate from './components/Tamplate'
import RDO from './pages/RDO'
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
						<Route element={<Tamplate />}>
							<Route path="/" element={<RDO />} />
							<Route path="/projetos" element={<Projects />} />
							<Route path="/configurações" element={<Setting />} />
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
