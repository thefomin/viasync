import { authApiOAuthByProvider } from '@/shared/api'
import { authService } from '@/shared/services/auth'
import { useMutation } from '@tanstack/react-query'

export function useOAuthByProviderMutation() {
	const { mutateAsync } = useMutation({
		mutationKey: [authApiOAuthByProvider.baseKey],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await authService.oauthByProvider(provider)
	})
	return { mutateAsync }
}
