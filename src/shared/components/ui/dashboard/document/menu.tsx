import { MoreHorizontal } from 'lucide-react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '../..'
import { useDateTime } from '@/shared/hooks/document'
import { IDocument } from '@/shared/types/document'
import { MenuList } from '.'

interface MenuProps {
	initialData: IDocument
}

export const Menu = ({ initialData }: MenuProps) => {
	const { createdAt, updatedAt } = useDateTime(initialData)
	if (!initialData) return null

	return (
		<Popover>
			<PopoverTrigger asChild onClick={e => e.stopPropagation()}>
				<Button
					variant='ghost'
					aria-label='more'
					className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04] [&_svg]:size-[18px]'
				>
					<MoreHorizontal className='h-8 w-8' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='z-[99999] w-[265px] rounded-xl border border-muted-foreground/20 bg-third p-1'
				align='start'
				alignOffset={8}
				forceMount
				onClick={e => e.stopPropagation()}
			>
				<MenuList initialData={initialData} />
				<div className='mt-[9px] flex flex-col gap-1 p-2 text-xs font-medium text-muted-foreground/60'>
					<span>Created {createdAt}</span>
					<span>Edited {updatedAt}</span>
				</div>
			</PopoverContent>
		</Popover>
	)
}
