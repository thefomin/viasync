'use client'

import { DraggableProvided } from '@hello-pangea/dnd'
import { IDocument } from '@/shared/types/document'
import { useQueryClient } from '@tanstack/react-query'
import { useGetById, useUpdateMutation } from '@/shared/hooks/document'
import { Button } from '../..'
import { IconPicker } from '../document'
import { QueryClientService } from '@/shared/services/document'

import { cn } from '@/shared/utils'
import { useDocument } from '@/shared/providers'
import Link from 'next/link'

interface CardProps {
	initialData: IDocument
	provided?: DraggableProvided
	documentId: string
	className?: string
}

export const Card = ({
	initialData,
	provided,
	documentId,
	className
}: CardProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const { update } = useUpdateMutation()
	const { document } = useGetById(initialData.id)

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
	const { resetWidth } = useDocument()

	return (
		<Link href={`${initialData.parentDocumentId}?v=${documentId}`}>
			<div
				ref={provided?.innerRef}
				className={cn(
					'relative h-full min-h-[40px] cursor-pointer rounded-[10px] border border-muted-foreground/10 bg-card-secondary/[0.04] hover:bg-primary/[.08]',
					className
				)}
				onClick={resetWidth}
				{...provided?.draggableProps}
				{...provided?.dragHandleProps}
			>
				{/* <div className='flex flex-col px-2.5 pt-2'>
					<div
						className={cn(
							'flex h-7 items-center rounded-md pl-[1px] text-xs hover:bg-primary/[.04]',
							tag &&
								'max-w-max pr-1 text-pink-500 hover:bg-pink-500/10 focus:bg-pink-500/40 focus:text-pink-500'
						)}
					>
						<Button
							variant='ghost'
							className='z-[999] flex size-6 max-w-80 flex-row justify-center gap-1 rounded-sm p-1 font-normal hover:bg-transparent'
						>
							<div className='flex size-5 items-center justify-center'>
								<div className='size-[18px] text-[18px]'>
									<IoPricetag
										className={cn(
											'fill-muted-foreground/70',
											tag && 'fill-pink-500'
										)}
									/>
								</div>
							</div>
						</Button>
						<div className='relative min-h-[21px] w-auto min-w-0 max-w-full flex-grow truncate whitespace-pre-wrap break-words px-[1px] py-[2px] text-sm font-medium'>
							Тестовый тэг
						</div>
					</div>
				</div> */}
				<div className='flex h-auto w-auto flex-row items-start justify-start gap-1 px-2.5 pb-1.5 pt-2'>
					<div className='relative' onClick={e => e.stopPropagation}>
						{!!document?.icon && (
							<IconPicker
								onChange={handleEmojiSelect}
								onClick={deleteIcon}
							>
								<Button
									variant='ghost'
									className='z-[999] flex size-6 max-w-80 flex-row justify-center gap-1 rounded-sm p-1 font-normal'
								>
									<div className='flex size-5 items-center justify-center'>
										<div className='size-[18px] text-[18px]'>
											<span
												className='text-muted-foreground'
												aria-label={document.icon}
											>
												{document
													? document.icon
													: null}
											</span>
										</div>
									</div>
								</Button>
							</IconPicker>
						)}
					</div>
					<div
						className='relative min-h-[21px] w-auto min-w-0 max-w-full flex-grow truncate whitespace-pre-wrap break-words px-[1px] py-[2px] text-sm font-medium'
						data-placeholder='Untitled'
					>
						{initialData.title
							? document?.title || ''
							: initialData.title || ''}
					</div>
				</div>
				{/* {document?.description?.length && (
					<div className='flex h-auto w-auto flex-row items-start justify-start gap-1 px-2.5'>
						<div
							className='relative'
							onClick={e => e.stopPropagation}
						>
							<Button
								variant='ghost'
								className='z-[999] flex size-6 max-w-80 flex-row justify-center gap-1 rounded-sm p-1 font-normal hover:bg-transparent'
							>
								<div className='flex size-5 items-center justify-center'>
									<div className='size-[18px] text-[18px]'>
										<GrTextAlignFull className='fill-muted-foreground/70' />
									</div>
								</div>
							</Button>
						</div>
						<div
							className='relative min-h-[21px] w-auto min-w-0 max-w-full flex-grow truncate whitespace-pre-wrap break-words px-[1px] py-[2px] text-sm font-medium text-muted-foreground/70'
							data-placeholder='Untitled'
						>
							{document.description}
						</div>
					</div>
				)} */}
				{/* <div className='flex flex-col px-2.5 pt-2'>
					<div className='flex h-7 items-center rounded-md pl-[1px] text-xs hover:bg-primary/[.04]'>
						<Button
							variant='ghost'
							className='z-[999] flex size-6 max-w-80 flex-row justify-center gap-1 rounded-sm p-1 font-normal hover:bg-transparent'
						>
							<div className='flex size-5 items-center justify-center'>
								<div className='size-[18px] text-[18px]'>
									<HiUsers className='-scale-x-100 fill-muted-foreground/70' />
								</div>
							</div>
						</Button>
						<div className='relative min-h-[21px] w-auto min-w-0 max-w-full flex-grow truncate whitespace-pre-wrap break-words px-[1px] py-[2px] text-sm font-medium'>
							Ответственный
						</div>
					</div>
				</div>
				<div className='flex flex-col px-2.5 pb-[0.675rem] pt-2'>
					<div
						className={cn(
							'flex h-7 items-center rounded-md pl-[1px] text-xs hover:bg-primary/[.04]',
							priority &&
								'max-w-max pr-1 text-red-500 hover:bg-red-500/10 focus:bg-red-400/20 focus:text-red-300'
						)}
					>
						<Button
							variant='ghost'
							className='z-[999] flex size-6 max-w-80 flex-row justify-center gap-1 rounded-sm p-1 font-normal hover:bg-transparent'
						>
							<div className='flex size-5 items-center justify-center'>
								<div className='size-[18px] text-[18px]'>
									<TbAlertTriangleFilled
										className={cn(
											'fill-muted-foreground/70',
											priority && 'fill-red-500'
										)}
									/>
								</div>
							</div>
						</Button>
						<div className='relative min-h-[21px] w-auto min-w-0 max-w-full flex-grow truncate whitespace-pre-wrap break-words px-[1px] py-[2px] text-sm font-medium'>
							Тестовый тэг
						</div>
					</div>
				</div> */}
			</div>
		</Link>
	)
}
