import {
	columnApiQuery,
	documentApiQuery,
	documentMenuApiQuery,
	documentsApiQuery,
	documentsArchiveApiQuery,
	documentsArchivedApiQuery,
	documentsFavoritedApiQuery,
	documentsLastVisitedApiQuery
} from '@/shared/api'
import { IDocument } from '@/shared/types/document'
import { QueryClient } from '@tanstack/react-query'

export class QueryClientService {
	private readonly queryClient: QueryClient

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient
	}
	public updateAllFields(
		initialData: IDocument,
		updates: Partial<IDocument>,
		options: { updateArchive?: boolean; updateFavorites?: boolean } = {},
		deletedId?: string
	): void {
		this.updateByDocumentId(initialData, updates)
		this.updateDocuments(initialData, updates)

		if (options.updateFavorites) {
			this.updateFavorites(initialData, updates)
		}
		if (options.updateArchive) {
			this.updateArchive(initialData, updates, deletedId)
		}
	}

	private updateDocuments(
		initialData: IDocument,
		updates: Partial<IDocument>
	): void {
		// Рекурсивная функция для обновления всех документов
		const updateRecursive = (docs: IDocument[]): IDocument[] => {
			return docs.map(doc => {
				// Если найден нужный документ, обновляем его
				if (doc.id === initialData.id) {
					return { ...doc, ...updates }
				}

				// Если есть дочерние элементы, вызываем рекурсивно
				if (doc.children) {
					return {
						...doc,
						children: updateRecursive(doc.children) // Рекурсивно обновляем детей
					}
				}

				// Если нет детей, просто возвращаем документ без изменений
				return doc
			})
		}

		const queryKeys = [
			documentsApiQuery.baseKey,
			documentsLastVisitedApiQuery.baseKey
		]

		for (const queryKey of queryKeys) {
			// Получаем текущие данные из кеша
			const documents = this.queryClient.getQueryData<IDocument[]>([
				queryKey
			])

			// Проверяем, есть ли документы
			if (documents) {
				console.log('Обновляем документы для:', queryKey) // Логирование
				const updatedDocuments = updateRecursive(documents)
				console.log('Обновленные документы:', updatedDocuments) // Логирование

				// Обновляем данные в кеше
				this.queryClient.setQueryData<IDocument[]>(
					[queryKey],
					updatedDocuments
				)
			}
		}
	}

	private updateFavorites(
		initialData: IDocument,
		updates: Partial<IDocument>
	): void {
		const favorites =
			this.queryClient.getQueryData<IDocument[]>([
				documentsFavoritedApiQuery.baseKey
			]) || []

		// Если в updates нет isFavorited, используем значение из initialData
		const isFavorited = updates.isFavorited ?? initialData.isFavorited

		const updatedFavorites = isFavorited
			? // Если isFavorited === true, обновляем документ или добавляем его в избранное
				favorites.some(doc => doc.id === initialData.id)
				? favorites.map(doc =>
						doc.id === initialData.id ? { ...doc, ...updates } : doc
					)
				: [...favorites, { ...initialData, ...updates }]
			: // Если isFavorited === false, удаляем документ из избранного
				favorites.filter(doc => doc.id !== initialData.id)

		// Обновляем дочерние элементы (если есть)
		const updatedFavoritesWithChildren = updatedFavorites.map(doc => {
			if (doc.children) {
				const updatedChildren = doc.children.map(child => {
					if (child.id === initialData.id) {
						return { ...child, ...updates }
					}
					return child
				})
				return { ...doc, children: updatedChildren }
			}
			return doc
		})

		// Обновляем данные в queryClient
		this.queryClient.setQueryData<IDocument[]>(
			[documentsFavoritedApiQuery.baseKey],
			updatedFavoritesWithChildren
		)
	}

	private addDocument(doc: IDocument, targetArray: IDocument[]): IDocument[] {
		const exists = targetArray.some(d => d.id === doc.id)

		// Если документ уже есть, возвращаем исходный массив
		if (exists) return targetArray

		// Если родитель существует, проверяем наличие документа в children
		const parent = targetArray.find(d => d.id === doc.parentDocumentId)
		if (parent && parent.children?.some(child => child.id === doc.id)) {
			console.warn(
				`⚠️ Дубликат в children родителя ${doc.parentDocumentId}`
			)
			return targetArray
		}

		return [...targetArray, doc]
	}
	private restoreDocumentRecursively(
		documents: IDocument[],
		documentToRestore: IDocument,
		updates: Partial<IDocument>
	): IDocument[] {
		return documents.map(doc => {
			if (doc.id === documentToRestore.parentDocumentId) {
				// Если найден родитель, восстанавливаем документ в children родителя
				const updatedChildren = doc.children
					? [...doc.children, { ...documentToRestore, ...updates }]
					: [{ ...documentToRestore, ...updates }]
				return { ...doc, children: updatedChildren }
			}

			// Если есть дети, рекурсивно восстанавливаем для каждого из них
			if (doc.children && doc.children.length > 0) {
				return {
					...doc,
					children: this.restoreDocumentRecursively(
						doc.children,
						documentToRestore,
						updates
					)
				}
			}

			return doc // Если родитель или дети не найдены, возвращаем документ без изменений
		})
	}
	private removeDocumentRecursively(
		documents: IDocument[],
		documentId: string
	): IDocument[] {
		return documents.reduce((acc, doc) => {
			if (doc.id === documentId) return acc

			// Если у документа есть дети — рекурсивно обрабатываем их
			const children = doc.children
				? this.removeDocumentRecursively(doc.children, documentId)
				: undefined

			return [...acc, { ...doc, ...(children ? { children } : {}) }]
		}, [] as IDocument[])
	}

	private updateArchive(
		initialData: IDocument,
		updates: Partial<IDocument>,
		deletedId?: string
	): void {
		const archives =
			this.queryClient.getQueryData<IDocument[]>([
				documentsArchivedApiQuery.baseKey,
				[null, documentsArchiveApiQuery.baseKey]
			]) || []

		const favorites =
			this.queryClient.getQueryData<IDocument[]>([
				documentsFavoritedApiQuery.baseKey
			]) || []

		const documents =
			this.queryClient.getQueryData<IDocument[]>([
				documentsApiQuery.baseKey
			]) || []

		console.log('🔍 Архив до обновления:', JSON.stringify(archives))
		console.log('📌 Документ до обновления:', JSON.stringify(initialData))

		// Инвалидация колонок, связанных с parentDocumentId, если они существуют
		const columns = this.queryClient.getQueryData<IDocument[]>([
			columnApiQuery.baseKey,
			initialData.parentDocumentId
		])
		if (columns) {
			this.queryClient.invalidateQueries({
				queryKey: [columnApiQuery.baseKey, initialData.parentDocumentId]
			})
		}

		// Определяем актуальное состояние isArchived
		const isArchived = updates.isArchived ?? initialData.isArchived

		// Копируем массивы для безопасных манипуляций
		let updatedArchives = [...archives]
		let updatedFavorites = [...favorites]
		let updatedDocuments = [...documents]

		// Функция для удаления документа из всех трёх коллекций
		const removeDocument = (id: string): void => {
			updatedDocuments = this.removeDocumentRecursively(
				updatedDocuments,
				id
			)
			updatedFavorites = this.removeDocumentRecursively(
				updatedFavorites,
				id
			)
			updatedArchives = this.removeDocumentRecursively(
				updatedArchives,
				id
			)
		}

		// Если передан deletedId — выполняем удаление и обновляем кэш
		if (deletedId) {
			console.log(`🗑 Удаляем документ с id: ${deletedId}`)
			removeDocument(deletedId)

			// Обновляем кэш
			this.queryClient.setQueryData<IDocument[]>(
				[documentsApiQuery.baseKey],
				updatedDocuments
			)
			this.queryClient.setQueryData<IDocument[]>(
				[documentsArchivedApiQuery.baseKey],
				updatedArchives
			)
			this.queryClient.setQueryData<IDocument[]>(
				[documentsFavoritedApiQuery.baseKey],
				updatedFavorites
			)
			return
		}

		// Ветка архивирования
		if (isArchived) {
			// Удаляем основной документ и его дочерние элементы из других коллекций
			removeDocument(initialData.id)
			initialData.children?.forEach(child => removeDocument(child.id))

			// Также, если документ встречается в children какого-либо другого документа, удаляем его
			updatedDocuments = updatedDocuments.map(doc => {
				if (doc.children?.some(child => child.id === initialData.id)) {
					return {
						...doc,
						children: doc.children.filter(
							child => child.id !== initialData.id
						)
					}
				}
				return doc
			})
			console.log(
				'📌 Обновлённые документы:',
				JSON.stringify(updatedDocuments, null, 2)
			)

			// Обновляем основной кэш по документам и архивам
			this.queryClient.setQueryData<IDocument[]>(
				[documentsApiQuery.baseKey],
				updatedDocuments
			)
			this.queryClient.setQueryData<IDocument[]>(
				[documentsArchivedApiQuery.baseKey],
				(oldArchives = []) => [
					...oldArchives,
					{ ...initialData, ...updates }
				]
			)
		} else {
			// Ветка восстановления из архива
			removeDocument(initialData.id)

			// Если родительский документ отсутствует, добавляем в общий список документов
			if (initialData.parentDocumentId === null) {
				updatedDocuments = this.addDocument(
					{ ...initialData, ...updates },
					updatedDocuments
				)
			}

			// Если документ был избранным, возвращаем его в список favorites
			// if (initialData.isFavorited) {
			updatedFavorites = this.restoreDocumentRecursively(
				updatedFavorites,
				initialData,
				updates
			)
			// }

			// Применяем рекурсивное восстановление, если такая логика реализована (метод restoreDocumentRecursively)
			if (!initialData.isFavorited) {
				updatedDocuments = this.restoreDocumentRecursively(
					updatedDocuments,
					initialData,
					updates
				)
			}

			// Убираем документ из архива
			this.queryClient.setQueryData<IDocument[]>(
				[documentsArchivedApiQuery.baseKey],
				(oldArchives = []) =>
					oldArchives.filter(doc => doc.id !== initialData.id)
			)
		}

		// Обновляем кэш для favorites и документов
		this.queryClient.setQueryData<IDocument[]>(
			[documentsFavoritedApiQuery.baseKey],
			updatedFavorites
		)
		this.queryClient.setQueryData<IDocument[]>(
			[documentsApiQuery.baseKey],
			updatedDocuments
		)

		console.log(
			'📌 Обновлённые документы:',
			JSON.stringify(updatedDocuments, null, 2)
		)
		console.log(
			'📌 Обновлённые документы Archives:',
			JSON.stringify(updatedArchives, null, 2)
		)
	}

	private updateByDocumentId(
		initialData: IDocument,
		updates: Partial<IDocument>
	): void {
		const document = this.queryClient.getQueryData<IDocument>([
			documentApiQuery.baseKey,
			initialData.id
		])

		if (document) {
			this.queryClient.setQueryData<IDocument>(
				[documentApiQuery.baseKey, initialData.id],
				{ ...document, ...updates }
			)
		}

		const documentMenu = this.queryClient.getQueryData<IDocument>([
			documentMenuApiQuery.baseKey,
			initialData.id
		])

		// Проверяем, если documentMenu существует, и обновляем его
		if (documentMenu) {
			this.queryClient.setQueryData<IDocument>(
				[documentMenuApiQuery.baseKey, initialData.id],
				{ ...documentMenu, ...updates }
			)
		}
	}
}
