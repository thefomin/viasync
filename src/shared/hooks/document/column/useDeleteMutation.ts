'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { IColumn } from '@/shared/types/document'
import { columnService } from '@/shared/services/document/column'
import { columnApiDeleteMutation } from '@/shared/api'

export function useDeleteMutation() {
	const { mutate: deleteColumn, isPending: isPendingDelete } = useMutation({
		mutationKey: [columnApiDeleteMutation.baseKey],
		mutationFn: async ({ columnId }: { columnId: string }) => {
			if (!columnId) {
				toast.error('Колонка не найдена')
				return Promise.reject(
					new Error(
						'Для удаления колонки требуется идентификатор колонки.'
					)
				)
			}
			const response = await columnService.delete(columnId)

			return response as IColumn
		},

		async onSuccess(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Колонка успешно удалена')
			}
		},

		onError(error) {
			toastMessageHandler(error)
		}
	})

	return {
		deleteColumn,
		isPendingDelete
	}
}
