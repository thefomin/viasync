import { documentApiUpdateMutation } from '@/shared/api'
import { TypeUpdateSchema } from '@/shared/schemes/document'
import { documentService } from '@/shared/services/document'

import { toastMessageHandler } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUpdateMutation() {
	const { mutate: update, isPending } = useMutation({
		mutationKey: [documentApiUpdateMutation.baseKey],
		mutationFn: async ({
			id,
			data
		}: {
			id: string
			data: TypeUpdateSchema
		}) => {
			if (!id) {
				toast.error('Задача не найдена')
				return Promise.reject(
					new Error(
						'Для удаления документа требуется существующий id.'
					)
				)
			}
			const response = documentService.update(data, id)
			console.log('response ' + JSON.stringify(response))
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
	return { update, isPending }
}
