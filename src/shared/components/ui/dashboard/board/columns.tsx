'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'

import { cn } from '@/shared/utils'

import { IDocument } from '@/shared/types/document'
import { Card, CreateColumn, CreateDocument, Status } from '.'
import { Plus } from 'lucide-react'
import { useDnd } from '@/shared/hooks/document/column'
import { Skeleton } from '../..'

interface ColumnProps {
	initialData: IDocument
	className?: string
}

export const Columns = ({ initialData, className }: ColumnProps) => {
	const { col, isPending } = useDnd()

	if (initialData.isBoard && isPending) return <Columns.Skeleton />
	if (!col || col.length === 0)
		return (
			<div className={cn('min-w-[260px]', className)}>
				<CreateColumn
					parentDocumentId={initialData.id}
					className='min-w-[326px]'
				/>
			</div>
		)
	return (
		<div className={cn('relative h-auto pt-3', className)}>
			{col?.map(column => (
				<Droppable droppableId={column.id} key={column.id}>
					{(provided, snapshot) => (
						<div
							className={cn(
								'flex flex-col gap-3',
								snapshot.isDraggingOver &&
									provided.droppableProps[
										'data-rfd-droppable-id'
									] !== column.id &&
									'flex-grow'
							)}
						>
							<div
								className='relative h-full min-w-[260px]'
								key={column.id}
							>
								<Status column={column} />
								<div className='flex flex-col gap-2'>
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className='box-content flex max-h-max min-h-10 flex-col gap-2'
									>
										{column.documents.map(
											(document, index) => (
												<Draggable
													key={document.id}
													draggableId={document.id.toString()}
													index={index}
												>
													{provided => (
														<Card
															documentId={
																document.id
															}
															initialData={
																document
															}
															provided={provided}
														/>
													)}
												</Draggable>
											)
										)}

										{provided.placeholder}
										<CreateDocument
											column={column}
											size='lg'
											variant='ghost'
											className='inline-flex h-[41px] w-full min-w-0 cursor-pointer justify-start whitespace-nowrap rounded-xl border border-card-secondary/[0.05] px-4 py-3 text-card-secondary/[0.28]'
										>
											<Plus className='h-7 w-7' />
											Создать задачу
										</CreateDocument>
									</div>
								</div>
							</div>
						</div>
					)}
				</Droppable>
			))}

			<div className='flex flex-col gap-3'>
				<div className='relative h-full min-w-[260px]'>
					<CreateColumn
						parentDocumentId={initialData.id}
						className='h-full min-w-[260px]'
					/>
				</div>
			</div>
		</div>
	)
}

Columns.Skeleton = function ColumnSkeleton() {
	return (
		<div className='relative flex h-96 flex-row gap-2 pt-3'>
			<Skeleton className='h-full min-w-[260px]' />
			<Skeleton className='h-full min-w-[260px]' />
			<Skeleton className='h-full min-w-[260px]' />
			<Skeleton className='h-full min-w-[260px]' />
		</div>
	)
}
