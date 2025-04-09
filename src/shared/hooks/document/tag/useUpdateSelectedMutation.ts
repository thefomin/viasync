import { tagSelectedApiUpdateMutation } from '@/shared/api'
import { TypeUpdateSelectedTagSchema } from '@/shared/schemes/document/tag'
import { tagService } from '@/shared/services/document/tag'

import { toastMessageHandler } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateSelectedMutation() {
	const { mutate: updateValues, isPending: isPendingValues } = useMutation({
		mutationKey: [tagSelectedApiUpdateMutation.baseKey],
		mutationFn: async ({
			id,
			data
		}: {
			id: string
			data: TypeUpdateSelectedTagSchema
		}) => {
			if (!id) {
				toast.error('Тэг не найден')
				return Promise.reject(
					new Error('Для изменения тэга требуется существующий id.')
				)
			}
			const response = tagService.updateTag(data, id)
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
	return { updateValues, isPendingValues }
}
