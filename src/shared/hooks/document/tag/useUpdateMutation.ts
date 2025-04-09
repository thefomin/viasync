import { tagApiUpdateMutation } from '@/shared/api'
import { TypeUpdateSchema } from '@/shared/schemes/document/tag'
import { tagService } from '@/shared/services/document/tag'

import { toastMessageHandler } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateMutation() {
	const { mutate: updateId, isPending: isPendingId } = useMutation({
		mutationKey: [tagApiUpdateMutation.baseKey],
		mutationFn: async ({
			id,
			data
		}: {
			id: string
			data: TypeUpdateSchema
		}) => {
			if (!id) {
				toast.error('Тэг не найден')
				return Promise.reject(
					new Error('Для изменения тэга требуется существующий id.')
				)
			}
			const response = tagService.update(data, id)
			return response
		},

		onSuccess(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		) {
			if (data.message) {
				toastMessageHandler(data)
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { updateId, isPendingId }
}
