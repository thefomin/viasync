import { QueryCache, QueryClient } from '@tanstack/react-query'
import { toastMessageHandler } from '../utils'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1 * 60 * 1000,
			refetchOnWindowFocus: false
		}
	},
	queryCache: new QueryCache({
		onError: (error, query) => {
			//Обработал ошибки как с самого сервера
			if (query) {
				toastMessageHandler(error)
			}
			// так и при наличии meta
			if (typeof query.meta?.errorMessage === 'string') {
				toastMessageHandler(new Error(query.meta.errorMessage))
			}
		}
	})
})
