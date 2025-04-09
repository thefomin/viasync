'use client'
import { Check } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '../..'
import TextareaAutosize from 'react-textarea-autosize'
import { cn } from '@/shared/utils'
import {
	IDocument,
	colorStyles,
	EnumColor,
	ITag
} from '@/shared/types/document'
import { useQueryClient } from '@tanstack/react-query'
import { QueryClientService } from '@/shared/services/document'
import {
	useDeleteMutation,
	useUpdateSelectedMutation
} from '@/shared/hooks/document/tag'
import { tagApiQuery } from '@/shared/api'
import { MenuItem } from '..'
import { IoTrashOutline } from 'react-icons/io5'
import { useState } from 'react'

interface ChangeColorProps {
	initialTag: ITag
	initialData: IDocument
}

export const ChangeColor = ({ initialTag, initialData }: ChangeColorProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const selectedColor = initialTag.color || 'ORANGE'
	const { updateValues } = useUpdateSelectedMutation()
	const { deleteTag, isPendingDelete } = useDeleteMutation()
	const [tagName, setTagName] = useState(initialTag.name || '')

	const handleChange = ({
		value,
		color
	}: {
		value?: string
		color?: EnumColor
	}) => {
		const selectedTag = initialData.selectedTag || {}

		const isNameChanged = value && value !== selectedTag.name
		const isColorChanged = color && color !== selectedTag.color

		if (!isNameChanged && !isColorChanged) return

		queryClient.setQueryData([tagApiQuery.baseKey], (oldData: ITag[]) => {
			if (oldData) {
				return oldData.map((tag: ITag) =>
					tag.id === initialTag.id
						? {
								...tag,
								...(isNameChanged && { name: value }),
								...(isColorChanged && { color })
							}
						: tag
				)
			}
			return oldData
		})
		if (
			initialData.selectedTag &&
			initialData.selectedTag.id === initialTag.id
		) {
			queryClientService.updateAllFields(initialData, {
				selectedTag: {
					id: initialTag.id,
					name: isNameChanged ? value : selectedTag.name,
					color: isColorChanged ? color : selectedTag.color,
					userId: selectedTag.userId
				}
			})
		}
		updateValues({
			id: initialTag.id || '',
			data: {
				...(isNameChanged && { name: value }),
				...(isColorChanged && { color })
			}
		})
	}

	const onRemove = () => {
		if (!initialTag.id) {
			console.error('Ошибка: initialTag.id отсутствует')
			return
		}
		if (
			initialData.selectedTag &&
			initialData.selectedTag.id === initialTag.id
		) {
			queryClientService.updateAllFields(initialData, {
				selectedTag: undefined
			})
			deleteTag({
				id: initialData.selectedTag.id,
				documentId: initialData.id
			})
		} else {
			deleteTag({
				id: initialTag.id
			})
		}
		queryClient.setQueryData([tagApiQuery.baseKey], (oldData: ITag[]) => {
			if (oldData) {
				return oldData.filter((tag: ITag) => tag.id !== initialTag.id)
			}
			return oldData
		})
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					onClick={e => e.stopPropagation()}
					className='relative z-50 flex h-5 w-5 items-center justify-center rounded-md p-3 text-muted-foreground hover:bg-primary/[.08] hover:text-foreground focus:outline-none focus:ring-0'
				>
					<MoreHorizontal />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='z-[999999999] w-56 rounded-lg border border-muted-foreground/10 bg-third p-0'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex max-h-[408px] flex-col overflow-hidden overflow-y-auto p-1'>
					<div className='px-1 py-2'>
						<TextareaAutosize
							value={tagName}
							onChange={e => setTagName(e.target.value)}
							onBlur={() => handleChange({ value: tagName })}
							placeholder='Untitled'
							className='w-full resize-none break-words rounded-sm border border-primary/10 bg-primary/5 px-2 py-0.5 text-foreground outline-none'
						/>
					</div>
					<div className='relative w-full'>
						<MenuItem
							icon={IoTrashOutline}
							label='Delete'
							className='hover:text-[#eb5757]'
							onClick={onRemove}
							disabled={isPendingDelete}
						/>

						<div className='absolute -bottom-[5px] left-1 right-1 h-[4px] border-b border-muted-foreground/30'></div>
					</div>
					<div className='mt-[9px] flex flex-col text-sm font-medium'>
						<div
							role='button'
							className='relative z-10 flex h-[30px] w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-[6px] px-2 text-[12px] text-muted-foreground/60'
						>
							Colors
						</div>
						{(
							Object.entries(colorStyles) as [EnumColor, string][]
						).map(([colorKey, colorClass]) => (
							<div
								key={colorKey}
								role='button'
								className='relative z-10 flex h-[30px] w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-[6px] px-2 text-sm capitalize hover:bg-primary/[.04]'
								onClick={() =>
									handleChange({ color: colorKey })
								}
							>
								<div className='flex flex-row gap-2'>
									<div
										className={cn(
											'inline-flex h-5 w-5 items-center justify-center rounded-[3px]',
											colorClass
										)}
									></div>
									<span className='capitalize'>
										{colorKey.charAt(0).toUpperCase() +
											colorKey.slice(1).toLowerCase()}
									</span>
								</div>
								<div>
									{colorKey === selectedColor && (
										<Check size={16} />
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
