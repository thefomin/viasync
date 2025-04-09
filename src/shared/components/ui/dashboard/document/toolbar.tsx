'use client'

import { ElementRef, useCallback, useRef } from 'react'
import { BsEmojiSmileFill } from 'react-icons/bs'
import TextareaAutosize from 'react-textarea-autosize'

import { AiFillPicture } from 'react-icons/ai'
import { useUpdateMutation } from '@/shared/hooks/document'
import { IDocument } from '@/shared/types/document'
import { debounce } from 'lodash'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../..'
import { CoverDropdown, IconPicker } from '.'
import { cn } from '@/shared/utils'
import { QueryClientService } from '@/shared/services/document'

interface ToolbarProps {
	initialData: IDocument
	preview?: boolean
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
	// const [isEditing, setIsEditing] = useState(false)
	const queryClient = useQueryClient()
	const { update } = useUpdateMutation()
	const queryClientService = new QueryClientService(queryClient)

	const inputRef = useRef<ElementRef<'textarea'>>(null)

	// const { data: document } = useQuery({
	// 	queryKey: [documentApiQuery.baseKey, initialData.id],
	// 	queryFn: async () =>
	// 		queryClient.getQueryData<IDocument>([
	// 			documentApiQuery.baseKey,
	// 			initialData.id
	// 		]) ?? []
	// })
	// const currentDocument = document as IDocument
	const title = initialData.title
	const icon = initialData.icon

	const disabledInput = () => {
		// setIsEditing(false)
		if (title !== initialData.title) {
			initialData.title = title
		}
	}
	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	const debouncedUpdate = useCallback(
		debounce(
			(value: string) => {
				update({
					id: initialData.id,
					data: {
						title: value || 'Untitled',
						updatedAt: new Date().toISOString()
					}
				})
			},
			500,
			{ leading: false, trailing: true }
		),
		[initialData.id]
	)
	// console.log('title toolbar ' + JSON.stringify(title))
	const onChange = (value: string) => {
		queryClientService.updateAllFields(
			initialData,
			{
				title: value,
				updatedAt: new Date().toISOString()
			},
			{ updateFavorites: true }
		)
		debouncedUpdate(value)
	}

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			disabledInput()
		}
	}

	const handleEmojiSelect = (icon: string) => {
		queryClientService.updateAllFields(
			initialData,
			{
				icon,
				updatedAt: new Date().toISOString()
			},
			{ updateFavorites: true }
		)

		update({
			id: initialData?.id,
			data: { icon, updatedAt: new Date().toISOString() }
		})
	}

	const deleteIcon = () => {
		queryClientService.updateAllFields(
			initialData,
			{
				icon: '',
				updatedAt: new Date().toISOString()
			},
			{ updateFavorites: true }
		)

		update({
			id: initialData?.id,
			data: { icon: '', updatedAt: new Date().toISOString() }
		})
	}

	return (
		<div
			className={cn(
				'group relative pl-12',
				!initialData.cover && 'mt-36'
			)}
		>
			{!!initialData.icon && !preview && (
				<div className='group/icon flex items-center gap-x-2 pt-6'>
					<IconPicker
						onChange={handleEmojiSelect}
						onClick={deleteIcon}
					>
						<Button
							variant='ghost'
							className={cn(
								'relative z-10 -mt-[52px] mb-1.5 ml-[3px] flex h-[78px] w-[78px] items-center rounded-sm transition ease-in hover:bg-sidebar-accent/30 disabled:opacity-100',
								initialData.cover && '-mt-[64px]',
								initialData.isArchived &&
									!initialData.cover &&
									'mt-[64px]'
							)}
							disabled={initialData.isArchived}
						>
							<div className='flex h-[78px] w-[78px] items-center justify-center text-[78px]'>
								<span
									className='flex h-full w-full items-center justify-center'
									aria-label={icon || ''}
								>
									{icon}
								</span>
							</div>
						</Button>
					</IconPicker>
				</div>
			)}
			{!!initialData.icon && preview && (
				<p className='pt-6 text-6xl'>{initialData.icon}</p>
			)}
			<div
				className={cn(
					initialData.cover && 'mt-5',
					!initialData.cover && '-mt-2'
				)}
			>
				<div className='flex items-center gap-x-1 py-2 group-hover:opacity-100 md:opacity-0'>
					{!initialData.icon &&
						!preview &&
						!initialData.isArchived && (
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
								onClick={() => {
									console.log('click')
								}}
							>
								<AiFillPicture />
								Добавить обложку
							</Button>
						</CoverDropdown>
					)}
				</div>
				<TextareaAutosize
					ref={inputRef}
					spellCheck='false'
					onBlur={disabledInput}
					onKeyDown={onKeyDown}
					value={title || ''}
					placeholder='Untitled'
					onChange={e => onChange(e.target.value)}
					className='w-full resize-none break-words bg-transparent text-4xl font-bold text-foreground outline-none placeholder:text-foreground/40'
					readOnly={preview || initialData.isArchived}
				/>
			</div>
		</div>
	)
}
