import { MoreHorizontal } from 'lucide-react'
import { Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from '..'
import { useGetMenu } from '@/shared/hooks/document'
import { MenuList } from '.'

interface MenuProps {
	documentId: string
}

export const Menu = ({ documentId }: MenuProps) => {
	const { docMenu } = useGetMenu(documentId, true)
	if (!docMenu) return null
	// const { document } = useGetById(documentId)
	// if (!document) return null
	return (
		<Popover>
			<PopoverTrigger asChild onClick={e => e.stopPropagation()}>
				<Button
					size='icon'
					variant='ghost'
					className='focus-ring transition-bg-ease z-[999999] inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
					onClick={e => e.stopPropagation}
				>
					<MoreHorizontal className='h-6 w-6 opacity-0 transition group-hover:opacity-100' />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				className='z-[99999] h-[170px] w-[265px] rounded-xl border border-muted-foreground/20 bg-third p-1'
				align='start'
				alignOffset={8}
				forceMount
				onClick={e => e.stopPropagation()}
			>
				<MenuList document={docMenu} />
			</PopoverContent>
		</Popover>
	)
}

Menu.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}
			className='flex gap-x-2 py-[.1875rem]'
		>
			<Skeleton className='h-4 w-4 bg-primary/50' />
			<Skeleton className='h-4 w-[30%] bg-primary/50' />
		</div>
	)
}
