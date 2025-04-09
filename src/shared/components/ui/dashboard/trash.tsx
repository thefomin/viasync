'use client'
import { IoTrashOutline } from 'react-icons/io5'
import { Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from '..'
import { cn } from '@/shared/utils'
import { useArchive } from '@/shared/hooks/document'
import { TrashList } from '.'

export const Trash = () => {
	const { archive } = useArchive()
	if (archive === undefined) {
		return (
			<>
				<Trash.Skeleton />
			</>
		)
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					className={cn(
						'text-subtle-foreground group relative z-[9999] flex h-8 min-h-[32px] w-full cursor-pointer items-center justify-start gap-2 rounded-md px-1 py-1 pr-0.5 text-sm font-medium transition-all hover:bg-primary/[.04]'
					)}
				>
					<div className='focus-ring transition-bg-ease inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0'>
						<IoTrashOutline className='h-6 w-6' />
					</div>
					Trash
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='z-[99999] w-full rounded-xl border border-muted-foreground/20 bg-third p-0'
				align='center'
			>
				<TrashList initialData={archive} />
			</PopoverContent>
		</Popover>
	)
}

Trash.Skeleton = function ItemSkeleton() {
	return (
		<div className='flex items-center gap-2 px-1 py-1 pr-0.5'>
			<div className='h-6 w-6'>
				<Skeleton className='h-full w-6' />
			</div>
			<Skeleton className='h-3 w-full' />
		</div>
	)
}
