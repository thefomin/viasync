import { DragDropContext } from '@hello-pangea/dnd'

import { cn } from '@/shared/utils'
import { useDnd } from '@/shared/hooks/document/column'

interface CardDragWrapperProps {
	children: React.ReactNode
}

export function DndWrapper({ children }: CardDragWrapperProps) {
	const { handleDragEnd } = useDnd()

	return (
		<div className={cn('float-left ml-24 mr-24 w-full pb-12')}>
			<DragDropContext onDragEnd={handleDragEnd}>
				{children}
			</DragDropContext>
		</div>
	)
}
