import { documentsArchivedApiQuery } from '@/shared/api'
import { documentService } from '@/shared/services/document'
import { useQuery } from '@tanstack/react-query'

export function useArchive(id?: string) {
	const { data: archive, isPending } = useQuery({
		queryKey: [documentsArchivedApiQuery.baseKey],
		queryFn: () => {
			const response = documentService.getArchive(id || '')
			return response
		}
	})
	return { archive, isPending }
}
