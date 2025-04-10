'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils/'

import { TypeNewPasswordSchema } from '@/shared/schemes/auth'
import { passwordRecoveryService } from '@/shared/services/auth'
import { authApiNewPasswordMutation } from '@/shared/api'

export function useNewPasswordMutation(token: string | null) {
	const router = useRouter()
	// const searchParams = useSearchParams()

	// const token = searchParams.get('token')

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: [authApiNewPasswordMutation.baseKey],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeNewPasswordSchema

			recaptcha: string
		}) => passwordRecoveryService.new(values, token, recaptcha),
		onSuccess() {
			toast.success('Пароль успешно изменен', {
				description: 'Теперь вы можете войти в свой аккаунт.'
			})
			router.push('/auth/sign-in')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { newPassword, isLoadingNew }
}
