'use client'

import TextareaAutosize from 'react-textarea-autosize'

import { IDocument } from '@/shared/types/document'

import { cn } from '@/shared/utils'
import { Button, Skeleton } from '@/shared/components/ui'

interface ToolbarProps {
	initialData: IDocument
	preview?: boolean
	isSidebar?: boolean
}

export const ToolbarBoard = ({
	initialData,
	preview,
	isSidebar
}: ToolbarProps) => {
	const title = initialData.title

	return (
		<div
			className={cn(
				'align-center group sticky left-0 flex w-full flex-col',
				!initialData.cover && 'mt-14',
				isSidebar && 'mt-10'
			)}
		>
			{!!initialData.icon && preview && (
				<p className='pt-6 text-6xl'>{initialData.icon}</p>
			)}

			<div
				className={cn(
					'mb-2.5 max-w-full pl-24',
					initialData.cover && 'mt-5',
					!initialData.cover && '-mt-2',
					isSidebar && 'mt-1 pl-16'
				)}
			>
				<div
					className={cn(
						'flex flex-row items-start gap-2',
						isSidebar && 'flex-col'
					)}
					style={{
						paddingRight: `calc(96px + env(safe-area-inset-left))`
					}}
				>
					{!!initialData.icon && (
						<Button
							variant='ghost'
							className={cn(
								'relative z-10 flex h-[36px] w-[36px] items-center rounded-sm transition ease-in hover:bg-sidebar-accent/30 disabled:opacity-100'
							)}
							disabled={initialData.isArchived}
						>
							<div className='flex h-[36px] w-[36px] items-center justify-center text-[36px]'>
								<span
									className='flex h-full w-full items-center justify-center'
									aria-label={initialData.icon || ''}
								>
									{initialData.icon}
								</span>
							</div>
						</Button>
					)}
					<TextareaAutosize
						spellCheck='false'
						value={title || ''}
						placeholder='Untitled'
						className='w-full resize-none break-words bg-transparent text-4xl font-bold text-foreground outline-none placeholder:text-foreground/40'
						readOnly={true}
					/>
				</div>
			</div>
		</div>
	)
}

ToolbarBoard.Skeleton = function ToolbarBoardSkeleton() {
	return (
		<div className='relative flex h-96 flex-row gap-2 pt-3'>
			<Skeleton className='h-full min-w-[260px]' />
		</div>
	)
}
