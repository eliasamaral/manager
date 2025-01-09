import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@ant-design/v5-patch-for-react-19'

import { ApolloProvider } from '@apollo/react-hooks'
import client from './utility/apollo.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<ConfigProvider locale={ptBR}>
				<App />
			</ConfigProvider>
		</React.StrictMode>
	</ApolloProvider>,
)
