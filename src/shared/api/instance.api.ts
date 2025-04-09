import { FetchClient } from '@/shared/utils/fetch'

export const api = new FetchClient({
	baseUrl: process.env.SERVER_URL as string,
	options: {
		credentials: 'include'
	}
})
