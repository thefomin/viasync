'use client'

import { ElementRef, useRef } from 'react'
import { BsEmojiSmileFill } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'

import { AiFillPicture } from 'react-icons/ai'
import { useDocumentUpdater } from '@/shared/hooks/document'
import { IDocument } from '@/shared/types/document'
import { Button, Skeleton } from '../..'

import { cn } from '@/shared/utils'
import { CoverDropdown, IconPicker } from '../document/'

interface ToolbarProps {
	initialData: IDocument
	preview?: boolean
	isSidebar?: boolean
	isPending?: boolean
}

export const ToolbarBoard = ({
	initialData,
	preview,
	isSidebar
}: ToolbarProps) => {
	const inputRef = useRef<ElementRef<'textarea'>>(null)

	const title = initialData.title
	const icon = initialData.icon

	const documentUpdater = useDocumentUpdater(initialData)
	const onChange = (value: string) => {
		documentUpdater.updateField('title', value)
	}

	const handleEmojiSelect = (emoji: { native: string }) => {
		documentUpdater.updateField('icon', emoji.native)
	}

	const deleteIcon = () => {
		documentUpdater.deleteField('icon')
	}

	return (
		<div
			className={cn(
				'align-center group sticky left-0 flex w-full flex-col',
				!initialData.cover && 'mt-14',
				isSidebar && 'mt-0'
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
						'flex items-center gap-x-1 py-2 group-hover:opacity-100 md:opacity-0',
						isSidebar && 'h-[41px]'
					)}
				>
					{!initialData.icon && !preview && (
						<IconPicker
							onChange={handleEmojiSelect}
							onClick={deleteIcon}
						>
							<Button
								variant='ghost'
								className='flex h-7 items-center justify-center gap-1.5 rounded-sm pl-1.5 pr-2 text-sm font-normal text-muted-foreground/60 hover:bg-sidebar-accent/50 hover:text-muted-foreground/60'
								disabled={initialData.isArchived}
							>
								<BsEmojiSmileFill size={16} />
								Добавить иконку
							</Button>
						</IconPicker>
					)}
					{!initialData.cover && !preview && (
						<CoverDropdown data={initialData}>
							<Button
								variant='ghost'
								className='flex h-7 items-center justify-center gap-1.5 rounded-sm pl-1.5 pr-2 text-sm font-normal text-muted-foreground/60 hover:bg-sidebar-accent/50 hover:text-muted-foreground/60 disabled:opacity-0'
								disabled={initialData.isArchived}
							>
								<AiFillPicture />
								Добавить обложку
							</Button>
						</CoverDropdown>
					)}
				</div>
				<div
					className={cn(
						'flex flex-row items-start gap-2',
						isSidebar && 'flex-col'
					)}
					style={{
						paddingRight: `calc(96px + env(safe-area-inset-left))`
					}}
				>
					{!!initialData.icon && !preview && (
						<IconPicker
							onChange={handleEmojiSelect}
							onClick={deleteIcon}
						>
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
										aria-label={icon || ''}
									>
										{icon}
									</span>
								</div>
							</Button>
						</IconPicker>
					)}
					<TextareaAutosize
						ref={inputRef}
						spellCheck='false'
						value={title || ''}
						placeholder='Untitled'
						onChange={e => onChange(e.target.value)}
						className='w-full resize-none break-words bg-transparent text-4xl font-bold text-foreground outline-none placeholder:text-foreground/40'
						readOnly={preview || initialData.isArchived}
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
