'use client'

import { ElementRef, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { IDocument } from '@/shared/types/document'
import { cn } from '@/shared/utils'

interface ToolbarProps {
	initialData: IDocument
}

export const Toolbar = ({ initialData }: ToolbarProps) => {
	const inputRef = useRef<ElementRef<'textarea'>>(null)

	const title = initialData.title

	return (
		<div
			className={cn(
				'group relative pl-12',
				!initialData.cover && 'mt-36'
			)}
		>
			{!!initialData.icon && (
				<div className='flex items-center gap-x-2 pt-6'>
					<div
						className={cn(
							'relative z-10 -mt-[52px] mb-1.5 ml-[3px] flex h-[78px] w-[78px] items-center rounded-sm transition ease-in hover:bg-sidebar-accent/30 disabled:opacity-100',
							initialData.cover && '-mt-[64px]',
							initialData.isArchived &&
								!initialData.cover &&
								'mt-[64px]'
						)}
					>
						<div className='flex h-[78px] w-[78px] items-center justify-center text-[78px]'>
							<span
								className='flex h-full w-full items-center justify-center'
								aria-label={initialData.icon}
							>
								{initialData.icon}
							</span>
						</div>
					</div>
				</div>
			)}
			<div
				className={cn(
					initialData.cover && 'mt-5',
					!initialData.cover && '-mt-2'
				)}
			>
				<TextareaAutosize
					ref={inputRef}
					spellCheck='false'
					value={title || ''}
					placeholder='Untitled'
					className='w-full resize-none break-words bg-transparent text-4xl font-bold text-foreground outline-none placeholder:text-foreground/40'
					readOnly={true}
				/>
			</div>
		</div>
	)
}
