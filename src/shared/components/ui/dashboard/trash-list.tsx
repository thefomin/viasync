'use client'
import { LuUndo2 } from 'react-icons/lu'
import { Button, Input } from '..'
import { useState } from 'react'
import { IDocument } from '@/shared/types/document'
import { IoTrashOutline } from 'react-icons/io5'
import { useDeleteMutation, useUpdateMutation } from '@/shared/hooks/document'
import Link from 'next/link'
import { ConfirmDelete } from './modals'
import { useParams, useRouter } from 'next/navigation'
import { QueryClientService } from '@/shared/services/document'
import { useQueryClient } from '@tanstack/react-query'

interface TrashListProps {
	initialData: IDocument[]
}

export const TrashList = ({ initialData }: TrashListProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const [search, setSearch] = useState('')
	const params = useParams()
	const router = useRouter()
	const { update, isPending } = useUpdateMutation()
	const { deleteDocument, isPendingDelete } = useDeleteMutation()
	const filteredDocuments = initialData?.filter(document => {
		return document.title?.toLowerCase().includes(search.toLowerCase())
	})

	const onRestore = (data: IDocument) => {
		queryClientService.updateAllFields(
			data,
			{
				isArchived: false
			},
			{ updateFavorites: true, updateArchive: true }
		)

		update({
			id: data.id,
			data: {
				isArchived: false
			}
		})
	}

	const onRemove = (data: IDocument) => {
		queryClientService.updateAllFields(
			data,
			{ id: data.id },
			{ updateArchive: true },
			data.id
		)
		deleteDocument(data.id)
		if (params.documentId === data.id) {
			router.push('/')
		}
	}

	return (
		<section className='ov flex w-96 flex-col space-y-4 text-sm'>
			<div className='h-72 p-2'>
				<div className='flex h-7 items-center gap-x-1 rounded-sm border border-primary/10 bg-secondary p-2 px-2'>
					<Input
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='h-7 flex-1 truncate border border-transparent bg-transparent px-4 pl-0 text-xs leading-none focus-visible:ring-transparent disabled:pointer-events-none disabled:text-foreground'
						placeholder='Искать по названию...'
						aria-label='Filter by page title'
					/>
				</div>
				<div className='b-1 flex h-full w-full flex-col'>
					{!initialData ||
						(initialData.length === 0 && !search && (
							<div className='flex h-full w-full items-center justify-center'>
								<span className='pb-2 text-center text-sm font-medium text-muted-foreground'>
									Нет результатов
								</span>
							</div>
						))}
					{filteredDocuments.length === 0 && search && (
						<div className='flex h-full w-full items-center justify-center'>
							<span className='pb-2 text-center text-sm font-medium text-muted-foreground'>
								Нет совпадений
							</span>
						</div>
					)}

					{filteredDocuments?.map(document => (
						<div
							key={document.id}
							onClick={e => e.stopPropagation()}
						>
							<Link
								href={document.id}
								className='text-subtle-foreground relative z-[9999] flex h-8 min-h-[32px] w-full cursor-pointer items-center justify-start gap-2 rounded-md p-0 px-1 text-sm font-medium transition-all hover:bg-primary/[.04]'
								aria-label='Document'
							>
								<span className='truncate pl-2'>
									{document.title || 'Untitled'}
								</span>
								<div className='flex flex-grow items-center justify-end'>
									<Button
										onClick={e => {
											e.stopPropagation()
											e.preventDefault()
											onRestore(document)
										}}
										variant='ghost'
										size='icon'
										className='focus-ring transition-bg-ease z-[99999] inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
										aria-label='Restore Document'
										disabled={isPending}
									>
										<LuUndo2 className='h-6 w-6 opacity-100 transition' />
									</Button>
									<ConfirmDelete
										onConfirm={() => {
											onRemove(document)
										}}
									>
										<Button
											variant='ghost'
											size='icon'
											className='focus-ring transition-bg-ease z-[99999] inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
											aria-label='Restore Document'
											disabled={isPendingDelete}
										>
											<IoTrashOutline className='h-6 w-6 opacity-100 transition' />
										</Button>
									</ConfirmDelete>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
			<footer className='light:bg-red-500 relative flex flex-shrink-0 justify-end rounded-b-xl dark:bg-blue-900/20'>
				<div className='absolute -top-[1px] left-3 right-3 h-[1px] bg-muted-foreground/40'></div>
				<div className='ml-3 flex w-full items-center justify-between py-2 pl-2 pr-2.5 text-xs'>
					<div className='text-muted-foreground'>
						Все страницы в корзине через 30 дней, будут удалены.
					</div>
				</div>
			</footer>
		</section>
	)
}
