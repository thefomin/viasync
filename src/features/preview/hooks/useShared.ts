import { documentsSharedApiQuery } from '@/shared/api'
import { documentService } from '@/shared/services/document'
import { useQuery } from '@tanstack/react-query'

export function useShared(id: string) {
	const { data: shared, isPending } = useQuery({
		queryKey: [documentsSharedApiQuery.baseKey, id],
		queryFn: () => {
			if (!id) return null
			const response = documentService.getShared(id)
			return response
		}
	})
	return { shared, isPending }
}
