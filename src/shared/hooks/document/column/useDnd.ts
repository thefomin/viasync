'use client'

import { IDocument } from '@/shared/types/document'

import { DropResult } from '@hello-pangea/dnd'

import { useParams } from 'next/navigation'

import { useColumns } from '.'
import { usePositionMutation } from '..'

export function useDnd() {
	const params = useParams()
	const documentId = params.documentId as string

	const { col, isPending, setCol } = useColumns(documentId)

	const { updatePosition } = usePositionMutation()

	// // source - массив задач, из которого элемент будет перемещен.
	// // destination - массив задач, в который элемент будет перемещен.
	// // sourceIndex - индекс элемента в source, который нужно переместить.
	// // destIndex - индекс в destination, на который нужно вставить элемент.
	const handleDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result

		if (!destination) return
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		const sourceColumnId = source.droppableId
		const destColumnId = destination.droppableId

		setCol(prevColumns => {
			const newColumns = [...prevColumns]
			const sourceColumn = newColumns.find(
				col => col.id === sourceColumnId
			)
			const destColumn = newColumns.find(col => col.id === destColumnId)

			if (!sourceColumn || !destColumn) return prevColumns

			const taskIndex = sourceColumn.documents.findIndex(
				task => task.id === draggableId
			)
			if (taskIndex === -1) return prevColumns

			const [movedTask] = sourceColumn.documents.splice(taskIndex, 1)
			destColumn.documents.splice(destination.index, 0, movedTask)

			return newColumns
		})

		updatePosition({
			ids: col
				.find(col => col.id === destColumnId)!
				.documents.map((item: IDocument) => item.id),
			documentId: draggableId,
			columnId: destColumnId
		})
	}

	return { handleDragEnd, col, isPending }
}
