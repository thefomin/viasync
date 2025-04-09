import { api } from '@/shared/api'
import {
	TypeCreateSchema,
	TypeUpdateSchema,
	TypeUpdateSelectedTagSchema
} from '@/shared/schemes/document/tag'

import { IDocument, ITag } from '@/shared/types/document'

class TagService {
	public async create(body: TypeCreateSchema, id: string) {
		const response = await api.post<ITag>(`document/tag/${id}`, body)
		return response
	}
	public async update(body: TypeUpdateSchema, id: string) {
		const response = await api.patch<IDocument>(`document/tag/${id}`, body)
		return response
	}
	public async updateTag(body: TypeUpdateSelectedTagSchema, id: string) {
		const response = await api.patch<IDocument>(
			`document/tag/selected/${id}`,
			body
		)
		return response
	}
	public async delete(id: string, documentId?: string) {
		const response = await api.delete(
			documentId
				? `document/tag/${id}?documentId=${documentId}`
				: `document/tag/${id}`
		)
		return response
	}

	public async getTags() {
		const response = await api.get<ITag[]>('document/tags')
		return response
	}
}

export const tagService = new TagService()
