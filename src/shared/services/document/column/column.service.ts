import { api } from '@/shared/api'
import {
	TypeCreateSchema,
	TypeUpdateOrderSchema,
	TypeUpdateSchema
} from '@/shared/schemes/document/column'

import { IColumn } from '@/shared/types/document'

class ColumnService {
	public async getColumns(id: string) {
		const response = await api.get<IColumn[]>(`column/${id}`)
		return response
	}
	public async sharedColumns(id: string) {
		const response = await api.get<IColumn[]>(`column/shared/${id}`)
		return response
	}
	public async create(body: TypeCreateSchema) {
		const response = await api.post<IColumn[]>(`column`, body)
		return response
	}
	public async update(id: string, body: TypeUpdateSchema) {
		const response = await api.patch<IColumn[]>(`column/${id}`, body)
		return response
	}
	public async delete(id: string) {
		const response = await api.delete<IColumn>(`column/${id}`)
		return response
	}

	public async docOrderUpdate(body: TypeUpdateOrderSchema, id: string) {
		const response = await api.patch(`column/p/${id}`, body)
		return response
	}
}

export const columnService = new ColumnService()
