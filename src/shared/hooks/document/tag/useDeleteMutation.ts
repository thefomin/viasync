'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { tagService } from '@/shared/services/document/tag'
import { tagApiDeleteMutation } from '@/shared/api'

export function useDeleteMutation() {
	const { mutate: deleteTag, isPending: isPendingDelete } = useMutation({
		mutationKey: [tagApiDeleteMutation.baseKey],
		mutationFn: async ({
			id,
			documentId
		}: {
			id: string
			documentId?: string
		}) => {
			console.log('Удаляем тег с ID:', id, 'и documentId:', documentId)
			if (!id) {
				toast.error('Тэг не найден')
				return Promise.reject(
					new Error('Tag ID is required to delete a tag')
				)
			}
			const response = await tagService.delete(id, documentId)

			return response
		},
		async onSuccess(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Тэг успешно удален')
			}
		},

		onError(error) {
			toastMessageHandler(error)
		}
	})

	return {
		deleteTag,
		isPendingDelete
	}
}
