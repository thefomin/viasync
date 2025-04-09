import { columnApiQuery } from '@/shared/api'
import { IColumn } from '@/shared/types/document'
import { QueryClient } from '@tanstack/react-query'

export class QueryClientService {
	private readonly queryClient: QueryClient

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient
	}
	public updateAllFields(initialData: IColumn): void {
		this.updateColumns(initialData)
	}

	private updateColumns(initialData: IColumn): void {
		this.queryClient.invalidateQueries({
			queryKey: [columnApiQuery.baseKey, initialData.id]
		})
	}
}
