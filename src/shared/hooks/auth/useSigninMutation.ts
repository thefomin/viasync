import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { TypeSigninSchema } from '@/shared/schemes/auth'
import { authService } from '@/shared/services/auth'
import { toastMessageHandler } from '@/shared/utils'
import { authApiSigninMutation } from '@/shared/api'

export function useSigninMutation(
	setIsShowFactor: Dispatch<SetStateAction<boolean>>
) {
	const router = useRouter()
	const { mutate: signin, isPending: isLoadingSignin } = useMutation({
		mutationKey: [authApiSigninMutation.baseKey],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeSigninSchema
			recaptcha: string
		}) => authService.signin(values, recaptcha),
		onSuccess(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		) {
			if (data.message) {
				toastMessageHandler(data)

				setIsShowFactor(true)
			} else {
				toast.success('Успешная авторизация')
				router.push('/')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { signin, isLoadingSignin }
}
