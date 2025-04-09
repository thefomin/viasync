'use client'

import { IDocument } from '@/shared/types/document/document.types'
import TextareaAutosize from 'react-textarea-autosize'
import { useCallback } from 'react'
import { Popover, PopoverContent, PopoverTrigger, Skeleton } from '..'
import { useUpdateMutation } from '@/shared/hooks/document'
import { debounce } from 'lodash'
import { documentsApiQuery } from '@/shared/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { IconPicker } from './document'
import { FileIcon } from 'lucide-react'
import { QueryClientService } from '@/shared/services/document'

interface TitleProps {
	initialData: IDocument
	children: React.ReactNode
}

export const Title = ({ initialData, children }: TitleProps) => {
	// const [isEditing, setIsEditing] = useState(false)
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const { update } = useUpdateMutation()

	const { data: documents } = useQuery({
		queryKey: [documentsApiQuery.baseKey],
		queryFn: async () =>
			queryClient.getQueryData<IDocument[]>([
				documentsApiQuery.baseKey
			]) ?? []
	})
	const currentDocument = documents?.find(doc => doc.id === initialData.id)
	const title = currentDocument?.title || initialData.title
	const icon = currentDocument?.icon || initialData.icon

	const disabledInput = () => {
		// setIsEditing(false)
		if (title !== initialData.title) {
			initialData.title = title
		}
	}
	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	const debouncedUpdate = useCallback(
		debounce(
			(newTitle: string) => {
				update({
					id: initialData.id,
					data: {
						title: newTitle || 'Untitled',
						updatedAt: new Date().toISOString()
					}
				})
			},
			500,
			{ leading: false, trailing: true }
		),
		[initialData.id]
	)

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

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			disabledInput()
		}
	}
	const deleteIcon = () => {
		queryClientService.updateAllFields(initialData, {
			icon: '',
			updatedAt: new Date().toISOString()
		})
		update({
			id: initialData?.id,
			data: { icon: '', updatedAt: new Date().toISOString() }
		})
	}

	return (
		<Popover>
			<PopoverTrigger
				asChild
				disabled={initialData.isArchived}
				className='disabled:opacity-100'
			>
				{children}
			</PopoverTrigger>
			<PopoverContent
				className='z-[99999] flex h-auto w-80 rounded-xl border-muted-foreground/10 bg-third p-1 px-2'
				align='start'
			>
				<div className='flex w-full flex-row items-center gap-1.5'>
					<IconPicker
						onChange={handleEmojiSelect}
						onClick={deleteIcon}
					>
						<div className='h-[30px] w-[30px] rounded-sm border border-primary/10 bg-primary/5 p-0.5 hover:bg-primary/[.09]'>
							<span
								className='inline-flex size-[24px] cursor-pointer select-none items-center justify-center text-lg text-muted-foreground'
								aria-label={icon}
							>
								{icon?.trim() ? (
									icon
								) : (
									<FileIcon className='h-4 w-4' />
								)}
							</span>
						</div>
					</IconPicker>

					<TextareaAutosize
						onBlur={disabledInput}
						onChange={e => onChange(e.target.value)}
						onKeyDown={onKeyDown}
						value={title || ''}
						placeholder='Untitled'
						className='w-full resize-none break-words rounded-sm border border-primary/10 bg-primary/5 px-2 py-0.5 text-foreground outline-none'
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}

Title.Skeleton = function TitleSkeleton() {
	return <Skeleton className='h-6 w-20 rounded-md' />
}
