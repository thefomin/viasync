'use client'
import { documentMenuApiQuery } from '@/shared/api'
import { documentService } from '@/shared/services/document/document.service'
import { useQuery } from '@tanstack/react-query'

export function useGetMenu(id: string | null, menu?: boolean) {
	const { data: docMenu, isPending } = useQuery({
		queryKey: [documentMenuApiQuery.baseKey, id],
		queryFn: async () => {
			if (!id) return null
			const response = await documentService.getById(id, menu)
			return response
		}
	})
	return { docMenu, isPending }
}
