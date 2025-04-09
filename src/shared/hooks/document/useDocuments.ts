import { documentsApiQuery } from '@/shared/api'
import { documentService } from '@/shared/services/document'
import { useQuery } from '@tanstack/react-query'

export function useDocuments() {
	const { data: documents, isPending } = useQuery({
		queryKey: [documentsApiQuery.baseKey],
		queryFn: () => {
			const response = documentService.getDocuments()
			return response
		}
	})
	return { documents, isPending }
}
