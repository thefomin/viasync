import { api } from '@/shared/api'

import { TypeSigninSchema, TypeSignupSchema } from '@/shared/schemes/auth'
import { IUser } from '@/shared/types/user'

class AuthService {
	public async signup(body: TypeSignupSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('auth/signup', body, {
			headers
		})

		return response
	}

	public async signin(body: TypeSigninSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>('auth/signin', body, {
			headers
		})

		return response
	}

	public async oauthByProvider(provider: 'google' | 'yandex') {
		const response = await api.get<{ url: string }>(
			`auth/oauth/connect/${provider}`
		)

		return response
	}

	public async logout() {
		const response = await api.post('auth/logout')

		return response
	}
}

export const authService = new AuthService()
