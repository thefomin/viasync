'use client'
import { columnApiQuery } from '@/shared/api'

import { columnService } from '@/shared/services/document/column'
import { IColumn } from '@/shared/types/document'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useColumns(id: string) {
	const { data: columns, isPending } = useQuery({
		queryKey: [columnApiQuery.baseKey, id],
		queryFn: () => {
			const response = columnService.getColumns(id)
			console.log('response ' + JSON.stringify(response))
			return response
		}
	})

	const [col, setCol] = useState<IColumn[]>(columns || [])

	useEffect(() => {
		setCol(columns || [])
	}, [columns])

	return { columns, isPending, col, setCol }
}
