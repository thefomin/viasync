'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authService } from '@/shared/services/auth'

import { toastMessageHandler } from '@/shared/utils'
import { userApiLogoutMutation } from '@/shared/api'

export function useLogoutMutation() {
	const router = useRouter()
	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationKey: [userApiLogoutMutation.baseKey],
		mutationFn: async () => authService.logout(),
		onSuccess() {
			router.push('/auth/sign-in')
			toast.success('Вы успешно вышли из системы')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return {
		logout,
		isLoadingLogout
	}
}
