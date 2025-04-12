'use client'

import { DraggableProvided } from '@hello-pangea/dnd'
import { IDocument } from '@/shared/types/document'
import { useDocumentUpdater, useGetById } from '@/shared/hooks/document'
import { Button } from '../..'
import { IconPicker } from '../document'

import { cn } from '@/shared/utils'
import { useDocument } from '@/shared/providers'
import { useRouter } from 'next/navigation'

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
	const { document } = useGetById(initialData.id)
	const router = useRouter()
	const { resetWidth } = useDocument()
	const documentUpdater = useDocumentUpdater(initialData)

	const handleEmojiSelect = (emoji: { native: string }) => {
		documentUpdater.updateField('icon', emoji.native)
	}

	const deleteIcon = () => {
		documentUpdater.deleteField('icon')
	}

	const onRedirect = () => {
		router.push(`${initialData.parentDocumentId}?v=${documentId}`)
	}

	return (
		<div onClick={onRedirect}>
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
				<div className='flex h-auto w-auto flex-row items-start justify-start gap-1 px-2.5 pb-1.5 pt-2'>
					<div
						className='relative'
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
						}}
					>
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
						{document?.title}
					</div>
				</div>
			</div>
		</div>
	)
}
