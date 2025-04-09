import { documentsLastVisitedApiQuery } from '@/shared/api'
import { documentService } from '@/shared/services/document'
import { useQuery } from '@tanstack/react-query'

export function useLastVisited() {
	const { data: lastVisited, isPending } = useQuery({
		queryKey: [documentsLastVisitedApiQuery.baseKey],
		queryFn: () => {
			const response = documentService.getLastVisited()
			return response
		}
	})
	return { lastVisited, isPending }
}
