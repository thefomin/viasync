'use client'
import { documentApiQuery } from '@/shared/api'
import { documentService } from '@/shared/services/document/document.service'
import { useQuery } from '@tanstack/react-query'

export function useGetById(id: string | null, menu?: boolean) {
	const { data: document, isPending } = useQuery({
		queryKey: [documentApiQuery.baseKey, id],
		queryFn: async () => {
			if (!id) return null
			const response = await documentService.getById(id, menu)
			return response
		}
	})
	return { document, isPending }
}
