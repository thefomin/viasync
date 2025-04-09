'use client'

import { cn } from '@/shared/utils'

import { IDocument } from '@/shared/types/document'

import { useColumns } from '../hooks'
import { Status } from '@/shared/components/ui/dashboard/board'
import { Button, Skeleton } from '@/shared/components/ui'
import Link from 'next/link'
import { useDocument } from '@/shared/providers'

interface ColumnProps {
	initialData: IDocument
	className?: string
}

export const Columns = ({ initialData, className }: ColumnProps) => {
	const { columns } = useColumns(initialData.id)
	const { resetWidth } = useDocument()
	// if (isPending) return <Columns.Skeleton />

	return (
		<div className={cn('relative h-auto pt-3', className)}>
			{columns?.map(column => (
				<div key={column.id}>
					<div className='relative h-full min-w-[260px]'>
						<Status column={column} preview={true} />
						<div className='flex flex-col gap-2'>
							<div className='box-content flex max-h-max min-h-10 flex-col gap-2'>
								{column.documents.map(document => (
									<Link
										key={document.id}
										href={`${document.parentDocumentId}?v=${document.id}`}
									>
										<div
											onClick={resetWidth}
											className='relative h-full min-h-[40px] cursor-pointer rounded-[10px] border border-muted-foreground/10 bg-card-secondary/[0.04] hover:bg-primary/[.08]'
										>
											<div className='flex h-auto w-auto flex-row items-start justify-start gap-1 px-2.5 pb-1.5 pt-2'>
												<div className='relative'>
													{!!document?.icon && (
														<Button
															variant='ghost'
															className='z-[999] flex size-6 max-w-80 flex-row justify-center gap-1 rounded-sm p-1 font-normal'
														>
															<div className='flex size-5 items-center justify-center'>
																<div className='size-[18px] text-[18px]'>
																	<span
																		className='text-muted-foreground'
																		aria-label={
																			document.icon
																		}
																	>
																		{document
																			? document.icon
																			: null}
																	</span>
																</div>
															</div>
														</Button>
													)}
												</div>
												<div
													className='relative min-h-[21px] w-auto min-w-0 max-w-full flex-grow truncate whitespace-pre-wrap break-words px-[1px] py-[2px] text-sm font-medium'
													data-placeholder='Untitled'
												>
													{document.title || ''}
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			))}
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
