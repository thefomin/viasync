'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import {
	columnApiQuery,
	documentApiDeleteMutation,
	documentsArchiveApiQuery,
	documentsArchivedApiQuery
} from '@/shared/api'
import { documentService } from '@/shared/services/document/document.service'

export function useDeleteMutation() {
	const queryClient = useQueryClient()
	const { mutate: deleteDocument, isPending: isPendingDelete } = useMutation({
		mutationKey: [documentApiDeleteMutation.baseKey],
		mutationFn: async (id: string) => {
			if (!id) {
				toast.error('Документ не найден')
				return Promise.reject(
					new Error('Document ID is required to delete a document')
				)
			}
			const response = await documentService.delete(id)

			console.log('response' + JSON.stringify(response))
			return response
		},
		async onSettled(variables) {
			await queryClient.invalidateQueries({
				queryKey: [
					documentsArchivedApiQuery.baseKey,
					[null, documentsArchiveApiQuery.baseKey]
				]
			})
			await queryClient.invalidateQueries({
				queryKey: [columnApiQuery.baseKey, variables?.parentDocumentId]
			})
		},
		async onSuccess(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Документ успешно удален')
			}
		},

		onError(error) {
			toastMessageHandler(error)
		}
	})

	return {
		deleteDocument,
		isPendingDelete
	}
}
