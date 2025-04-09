'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeSettingsSchema } from '@/shared/schemes/user'
import { userService } from '@/shared/services/user'
import { toastMessageHandler } from '@/shared/utils'
import { userApiUpdateMutation } from '@/shared/api'

export function useUpdateProfileMutation() {
	const { mutate: updateProfile, isPending: isLoadingUpdate } = useMutation({
		mutationKey: [userApiUpdateMutation.baseKey],
		mutationFn: (data: TypeSettingsSchema) =>
			userService.updateProfile(data),
		onSuccess() {
			// queryClient.invalidateQueries({ queryKey: [userApiQuery.baseKey] })
			toast.success('Профиль успешно обновлен')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { updateProfile, isLoadingUpdate }
}
