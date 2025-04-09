import { documentsFavoritedApiQuery } from '@/shared/api'
import { documentService } from '@/shared/services/document'
import { useQuery } from '@tanstack/react-query'

export function useFavorites(id?: string) {
	const { data: favorites, isPending } = useQuery({
		queryKey: [
			documentsFavoritedApiQuery.baseKey
			// [id, documentsFavoritesApiQuery.baseKey]
		],
		queryFn: () => {
			const response = documentService.getFavorites(id || '')
			return response
		}
	})
	return { favorites, isPending }
}
