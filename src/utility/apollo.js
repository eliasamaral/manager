import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'

// Cache configuration
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				getReports: {
					merge(_, incoming) {
						return incoming
					},
				},
				getActivities: {
					merge(_, incoming) {
						return incoming
					},
				},
			},
		},
	},
})

// HTTP configuration
const httpLink = createHttpLink({
	uri: import.meta.env.VITE_API_URL,
})

// Auth configuration
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token')

	if (token) {
		try {
			const decoded = jwt_decode(token)
			if (decoded.exp < Date.now() / 1000) {
				localStorage.removeItem('token')
				window.location.href = '/login'
				return headers
			}
		} catch (error) {
			localStorage.removeItem('token')
			return headers
		}
	}

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

// Error handling
const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (const { message, locations, path } of graphQLErrors) {
				console.error(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
				)
			}
		}

		if (networkError) {
			console.error(`[Network error]: ${networkError}`)
		}
	},
)

// Retry configuration
const retryLink = new RetryLink({
	delay: {
		initial: 300,
		max: Number.POSITIVE_INFINITY,
		jitter: true,
	},
	attempts: {
		max: 3,
		retryIf: (error, _operation) => !!error,
	},
})

// Link composition
const link = from([errorLink, retryLink, authLink, httpLink])

// Apollo Client instance
const client = new ApolloClient({
	link,
	cache,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
			errorPolicy: 'all',
		},
		query: {
			fetchPolicy: 'network-only',
			errorPolicy: 'all',
		},
		mutate: {
			errorPolicy: 'all',
		},
	},
	connectToDevTools: process.env.NODE_ENV === 'development',
})

export default client
