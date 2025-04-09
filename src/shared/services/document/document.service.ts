import { api } from '@/shared/api'
import {
	TypeCreateSchema,
	TypeUpdatePositionSchema,
	TypeUpdateSchema
} from '@/shared/schemes/document'

import { IDocument } from '@/shared/types/document'

class DocumentService {
	public async create(body: TypeCreateSchema) {
		const response = await api.post<IDocument>('document', body)
		return response
	}
	public async update(body: TypeUpdateSchema, id: string) {
		const response = await api.patch<IDocument>(`document/${id}`, body)
		return response
	}
	public async delete(id: string) {
		const response = await api.delete<IDocument>(`document/${id}`)
		return response
	}
	public async getShared(id: string) {
		const response = await api.get<IDocument>(`document/shared/${id}`)
		return response
	}
	public async getById(id: string, menu?: boolean) {
		const response = await api.get<IDocument>(
			menu ? `document/${id}?menu=true` : `document/${id}`
		)
		return response
	}
	public async getDocuments() {
		const response = await api.get<IDocument[]>('document')
		return response
	}
	public async getLastVisited() {
		const response = await api.get<IDocument[]>('document/lv')
		return response
	}
	public async getFavorites(id: string) {
		const response = await api.get<IDocument[]>(
			id
				? `document/favorites?parentDocumentId=${id}`
				: 'document/favorites'
		)
		return response
	}
	public async getArchive(id: string) {
		const response = await api.get<IDocument[]>(
			id ? `document/archive?parentDocumentId=${id}` : 'document/archive'
		)
		return response
	}
	public async updatePosition(body: TypeUpdatePositionSchema, id: string) {
		const response = await api.patch<IDocument>(
			`users/tasks/update-order/${id}`,
			body
		)
		return response
	}
}

export const documentService = new DocumentService()
