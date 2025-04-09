import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useUpdateMutation } from '@/shared/hooks/document'
import { IDocument } from '@/shared/types/document'
import { DocumentUpdater } from '@/entities/document'

export const useDocumentUpdater = (initialData: IDocument) => {
	const queryClient = useQueryClient()
	const { update } = useUpdateMutation()

	const documentUpdater = useMemo(() => {
		return new DocumentUpdater(queryClient, initialData, update)
	}, [queryClient, update])
	// initialData НЕ НУЖНО класть в зависимости!
	// Иначе будет каждый раз пересоздаваться новый DocumentUpdater

	return documentUpdater
}
