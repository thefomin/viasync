'use client'

import { useCreateMutation, useDocuments } from '@/shared/hooks/document'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Item } from '.'
import { cn } from '@/shared/utils'
import { FileIcon, Plus } from 'lucide-react'
import { Button } from '..'
import { IDocument } from '@/shared/types/document'

interface DocumentListProps {
	level?: number
	title?: string
	documents?: IDocument[]
}
export function DocumentList({
	level = 0,
	documents: parentDocuments,
	title
}: DocumentListProps) {
	const params = useParams()
	const router = useRouter()

	const [expanded, setExpanded] = useState<Record<string, boolean>>({})

	const { create, isPending: isPendingCreate } = useCreateMutation()
	const { documents: rootDocuments, isPending } = useDocuments()
	const documents = parentDocuments ?? rootDocuments
	const onExpanded = (documentId: string) => {
		setExpanded(prevExpended => ({
			...prevExpended,
			[documentId]: !prevExpended[documentId]
		}))
	}

	const onRedirect = (documentId: string) => {
		router.push(`/${documentId}`)
	}
	const handleCreateDocument = () => {
		create({
			title: ''
		})
	}

	if (isPending && documents === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
						<Item.Skeleton level={level} width={2} />
						<Item.Skeleton level={level} width={1} />
						<Item.Skeleton level={level} width={3} />
					</>
				)}
			</>
		)
	}
	if (!documents) return null

	if (documents.length === 0 && level !== 0) {
		return (
			<>
				<div
					style={{
						paddingLeft: `${(level + 1) * 4 + 4}px`
					}}
					className={cn(
						'flex min-h-[32px] w-full flex-row items-center justify-start text-sm font-medium text-muted-foreground/80'
					)}
				>
					No pages inside
				</div>
			</>
		)
	}
	return (
		<>
			{level === 0 && title && (
				<div
					role='button'
					className={cn(
						'retext-subtle-foreground group relative z-[9999] flex min-h-[32px] cursor-pointer items-center gap-2 rounded-md px-1 py-1 pr-0.5 text-sm font-medium transition-all hover:bg-primary/[.04]'
					)}
				>
					<span className='text-[12px] font-semibold'>{title}</span>
					<div className='absolute right-1 top-1 z-[99999] flex flex-row gap-1'>
						<Button
							size='icon'
							variant='ghost'
							className='focus-ring transition-bg-ease z-[999999] inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
							onClick={handleCreateDocument}
							disabled={isPendingCreate}
						>
							<Plus className='h-6 w-6 opacity-0 transition group-hover:opacity-100' />
						</Button>
					</div>
				</div>
			)}

			{documents?.map(document => (
				<div key={document.id} className='cursor-pointer'>
					<Item
						id={document.id}
						document={document}
						onClick={() => onRedirect(document.id)}
						label={document.title || 'Untitled'}
						icon={FileIcon}
						documentIcon={document.icon}
						active={params.documentId === document.id}
						level={level}
						onExpand={() => onExpanded(document.id)}
						expanded={expanded[document.id]}
						viewType={document.viewType}
					/>
					<div
						className='mt-0.5 w-full'
						style={{
							paddingLeft: `${(level + 1) * 0}px`
						}}
					>
						{expanded[document.id] && (
							<div
								className='mt-0.5 w-full'
								style={{
									paddingLeft: `${(level + 1) * 6}px`
								}}
							>
								{document.isBoard ? (
									<Item
										id={`${document.id}-board-view`}
										document={document}
										label='Board view'
										viewType='board'
										active={false}
										level={level + 1}
										onClick={() => onRedirect(document.id)}
									/>
								) : document.children?.length > 0 ? (
									<DocumentList
										level={level + 1}
										documents={document.children}
									/>
								) : (
									<div
										style={{
											paddingLeft: `${(level + 1) * 4 + 4}px`
										}}
										className='flex min-h-[32px] w-full flex-row items-center justify-start text-sm font-medium text-muted-foreground/80'
									>
										No pages inside
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			))}
		</>
	)
}
