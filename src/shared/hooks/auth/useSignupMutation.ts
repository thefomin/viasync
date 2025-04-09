import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeSignupSchema } from '@/shared/schemes/auth'
import { authService } from '@/shared/services/auth'
import { authApiSignupMutation } from '@/shared/api'

export function useSignupMutation() {
	const { mutate: signup, isPending: isLoadingSignup } = useMutation({
		mutationKey: [authApiSignupMutation.baseKey],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeSignupSchema
			recaptcha: string
		}) => authService.signup(values, recaptcha),
		onSuccess() {
			toast.success('Успешная регистрация', {
				description:
					'Подтвердите почту. Сообщение было отправлено на ваш почтовый адрес.'
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { signup, isLoadingSignup }
}
