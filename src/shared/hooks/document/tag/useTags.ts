import { tagApiQuery } from '@/shared/api'
import { tagService } from '@/shared/services/document/tag'
import { useQuery } from '@tanstack/react-query'

export function useTags() {
	const { data: tags, isPending } = useQuery({
		queryKey: [tagApiQuery.baseKey],
		queryFn: () => {
			const response = tagService.getTags()
			return response
		}
	})
	return { tags, isPending }
}
