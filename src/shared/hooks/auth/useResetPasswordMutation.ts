import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeResetPasswordSchema } from '@/shared/schemes/auth'
import { passwordRecoveryService } from '@/shared/services/auth'
import { authApiResetPasswordMutation } from '@/shared/api'

export function useResetPasswordMutation() {
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: [authApiResetPasswordMutation.baseKey],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeResetPasswordSchema
			recaptcha: string
		}) => passwordRecoveryService.reset(values, recaptcha),
		onSuccess() {
			toast.success('Проверьте почту', {
				description:
					'На вашу почту была отправлена ссылка для подтверждения.'
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { reset, isLoadingReset }
}
