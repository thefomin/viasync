import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { TypeCreateSchema } from '@/shared/schemes/document'
import { documentService } from '@/shared/services/document'
import {
	columnApiQuery,
	documentApiCreateMutation,
	documentsApiQuery,
	documentsFavoritedApiQuery
} from '@/shared/api'
import { IDocument } from '@/shared/types/document'

export function useCreateMutation() {
	const queryClient = useQueryClient()

	const { mutate: create, isPending } = useMutation({
		mutationKey: [documentApiCreateMutation.baseKey],
		mutationFn: (data: TypeCreateSchema) => documentService.create(data),
		async onSettled(variables) {
			// Этот обработчик вызывается после завершения мутации (т.е будь он onSucces или onError)
			// С помощью async/await мы ждем завершения запроса перед тем, как отправить следующий запрос
			await queryClient.invalidateQueries({
				queryKey: [documentsApiQuery.baseKey]
			})
			await queryClient.invalidateQueries({
				queryKey: [columnApiQuery.baseKey, variables?.id]
			})
			// queryClient.setQueryData(
			// 	[documentsApiQuery.baseKey],
			// 	(oldData: IDocument[]) => {
			// 		const updateChildren = (
			// 			documents: IDocument[]
			// 		): IDocument[] => {
			// 			return documents.map((doc: IDocument) => {
			// 				// Если это родительский документ, добавляем в его children
			// 				if (doc.id === variables?.parentDocumentId) {
			// 					return {
			// 						...doc,
			// 						children: Array.isArray(doc.children)
			// 							? [...doc.children, variables]
			// 							: [variables] // Если children не массив, создаем новый
			// 					}
			// 				}

			// 				// Если в children есть вложенные дети, обновляем их рекурсивно
			// 				if (
			// 					doc.children &&
			// 					Array.isArray(doc.children) &&
			// 					doc.children.length > 0
			// 				) {
			// 					return {
			// 						...doc,
			// 						children: updateChildren(doc.children) // Рекурсивный вызов
			// 					}
			// 				}

			// 				return doc // Возвращаем без изменений, если нет детей
			// 			})
			// 		}

			// 		return updateChildren(oldData) // Обновляем документы
			// 	}
			// )
			const updateDocuments = (
				oldData: IDocument[] | undefined
			): IDocument[] | undefined => {
				if (!oldData) return oldData // Если кэша нет, ничего не трогаем

				const updateChildren = (
					documents: IDocument[]
				): IDocument[] => {
					return documents.map((doc: IDocument) => {
						if (doc.id === variables?.parentDocumentId) {
							return {
								...doc,
								children: Array.isArray(doc.children)
									? [...doc.children, variables]
									: [variables]
							}
						}

						if (
							Array.isArray(doc.children) &&
							doc.children.length > 0
						) {
							return {
								...doc,
								children: updateChildren(doc.children)
							}
						}

						return doc
					})
				}

				return updateChildren(oldData)
			}
			queryClient.setQueryData<IDocument[]>(
				[documentsApiQuery.baseKey],
				oldData => updateDocuments(oldData)
			)

			// Обновляем второй ключ
			queryClient.setQueryData<IDocument[]>(
				[documentsFavoritedApiQuery.baseKey],
				oldData => updateDocuments(oldData)
			)
		},
		onSuccess(variables) {
			queryClient.invalidateQueries({
				queryKey: [documentsApiQuery.baseKey]
			})
			queryClient.invalidateQueries({
				queryKey: [columnApiQuery.baseKey, variables.id]
			})

			toast.success('Документ создан')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { create, isPending }
}
