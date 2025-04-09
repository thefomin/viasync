import { IDocument } from '@/shared/types/document'
import { Button } from '../..'

import { useDateTime } from '@/shared/hooks/document'

interface LastEditedProps {
	initialData: IDocument
}
export const LastEdited = ({ initialData }: LastEditedProps) => {
	const { updatedAt } = useDateTime(initialData)
	if (!initialData) return null
	return (
		<Button
			variant='ghost'
			aria-label='share'
			className='h-[28px] cursor-default rounded-lg px-2 text-muted-foreground/50 hover:bg-transparent hover:text-muted-foreground/50'
		>
			Edited {updatedAt}
		</Button>
	)
}
