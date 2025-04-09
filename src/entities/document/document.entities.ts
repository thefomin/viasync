import { debounce } from 'lodash'
import { QueryClient } from '@tanstack/react-query'
import { IDocument } from '@/shared/types/document'
import { QueryClientService } from '@/shared/services/document'

export class DocumentUpdater {
	private initialData: IDocument
	private queryClientService: QueryClientService
	private debouncedUpdate: (field: string, value: any) => void
	private updateMutation: (args: {
		id: string
		data: Partial<IDocument>
	}) => void

	constructor(
		queryClient: QueryClient,
		initialData: IDocument,
		updateMutation: (args: { id: string; data: Partial<IDocument> }) => void
	) {
		this.initialData = initialData
		this.queryClientService = new QueryClientService(queryClient)
		this.updateMutation = updateMutation

		this.debouncedUpdate = debounce((field: string, value: any) => {
			this.updateMutation({
				id: this.initialData.id,
				data: { [field]: value, updatedAt: new Date().toISOString() }
			})
		}, 500)
	}

	public updateField(field: keyof IDocument, value: any) {
		this.queryClientService.updateAllFields(
			this.initialData,
			{ [field]: value, updatedAt: new Date().toISOString() },
			{ updateFavorites: true }
		)
		this.debouncedUpdate(field, value)
	}

	public deleteField(field: keyof IDocument) {
		this.updateField(field, null)
	}
}
