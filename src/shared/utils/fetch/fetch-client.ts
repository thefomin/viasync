import { FetchError } from './fetch-error'
import { RequestOptions, TypeSearchParams } from '.'

export class FetchClient {
	private baseUrl: string
	public headers?: Record<string, string>
	public params?: TypeSearchParams
	public options?: RequestOptions

	public constructor(init: {
		baseUrl: string
		headers?: Record<string, string>
		params?: TypeSearchParams
		options?: RequestOptions
	}) {
		this.baseUrl = init.baseUrl
		this.headers = init.headers
		this.params = init.params
		this.options = init.options
	}

	private createSearchParams(params: TypeSearchParams) {
		const searchParams = new URLSearchParams()

		for (const key in { ...this.params, ...params }) {
			if (Object.prototype.hasOwnProperty.call(params, key)) {
				const value = params[key]
				if (Array.isArray(value)) {
					value.forEach(currentValue => {
						if (currentValue) {
							searchParams.append(key, currentValue.toString())
						}
					})
				} else if (value) {
					searchParams.set(key, value.toString())
				}
			}
		}
		return `?${searchParams.toString()}`
	}
	private async request<T>(
		endpoint: string,
		method: RequestInit['method'],
		options: RequestOptions = {}
	) {
		let url = `${this.baseUrl}/${endpoint}`
		if (options.params) {
			url += this.createSearchParams(options.params)
		}

		const config: RequestInit = {
			...options,
			...(!!this.options && { ...this.options }),
			method,
			headers: {
				...(!!options?.headers && options?.headers),
				...this.headers
			}
		}
		const response: Response = await fetch(url, config)

		if (!response.ok) {
			const error = (await response.json()) as
				| { message: string }
				| undefined

			throw new FetchError(
				response.status,
				error?.message || response.statusText
			)
		}
		if (
			response.headers.get('Content-Type')?.includes('application/json')
		) {
			return (await response.json()) as unknown as T
		} else {
			return (await response.text()) as unknown as T
		}
	}
	public get<T>(
		endpoint: string,
		options: Omit<RequestOptions, 'body'> = {}
	) {
		return this.request<T>(endpoint, 'GET', options)
	}

	public post<T>(
		/* eslint-disable @typescript-eslint/no-explicit-any */
		endpoint: string,
		body?: Record<string, any>,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'POST', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}
	public put<T>(
		/* eslint-disable @typescript-eslint/no-explicit-any */
		endpoint: string,
		body?: Record<string, any>,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'PUT', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}
	public delete<T>(
		endpoint: string,
		options: Omit<RequestOptions, 'body'> = {}
	) {
		return this.request<T>(endpoint, 'DELETE', options)
	}
	public patch<T>(
		/* eslint-disable @typescript-eslint/no-explicit-any */

		endpoint: string,
		body?: Record<string, any>,
		options: RequestOptions = {}
	) {
		return this.request<T>(endpoint, 'PATCH', {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options?.headers || {})
			},
			...(!!body && { body: JSON.stringify(body) })
		})
	}
	public connectWebSocket(
		endpoint: string,
		onMessage: (message: string) => void,
		onError?: (error: Event) => void,
		onClose?: (event: CloseEvent) => void
	): WebSocket {
		const url = `${this.baseUrl}`
		const socket = new WebSocket(url)

		socket.onmessage = (event: MessageEvent) => {
			onMessage(event.data)
		}

		socket.onerror =
			onError || (error => console.error('WebSocket Error:', error))
		socket.onclose =
			onClose || (event => console.log('WebSocket Closed:', event))

		return socket
	}
}
