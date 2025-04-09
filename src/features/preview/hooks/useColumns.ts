import { columnSharedApiQuery } from '@/shared/api'

import { columnService } from '@/shared/services/document/column'
import { useQuery } from '@tanstack/react-query'

export function useColumns(id: string) {
	const { data: columns, isPending } = useQuery({
		queryKey: [columnSharedApiQuery.baseKey, id],
		queryFn: () => {
			if (!id) return null
			const response = columnService.sharedColumns(id)
			return response
		}
	})
	return { columns, isPending }
}
