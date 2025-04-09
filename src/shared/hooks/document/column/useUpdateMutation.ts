import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { columnService } from '@/shared/services/document/column'
import { TypeUpdateSchema } from '@/shared/schemes/document/column'
import { columnApiUpdateMutation } from '@/shared/api'

export function useUpdateMutation() {
	const { mutate: update, isPending } = useMutation({
		mutationKey: [columnApiUpdateMutation.baseKey],

		mutationFn: ({
			columnId,
			data
		}: {
			columnId: string
			data: TypeUpdateSchema
		}) => {
			if (!columnId) {
				toast.error('Колонка не найдена')
				return Promise.reject(
					new Error(
						'Для обновления колонки требуется идентификатор колонки.'
					)
				)
			}

			return columnService.update(columnId, data)
		},

		onSuccess(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Содержимое успешно обновлено')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { update, isPending }
}
