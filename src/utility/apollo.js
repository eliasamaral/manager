import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const API_URL = import.meta.env.VITE_API_URL

const httpLink = createHttpLink({
	uri: API_URL,
})

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: localStorage.getItem('token') || '',
		},
	}
})

const link = from([authLink, httpLink])

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
	connectToDevTools: process.env.NODE_ENV === 'development',
})

export default client
