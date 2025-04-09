'use client'

import { useFavorites } from '@/shared/hooks/document'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Item } from '.'
import { cn } from '@/shared/utils'
import { FileIcon } from 'lucide-react'
import { IDocument } from '@/shared/types/document'

interface DocumentListProps {
	level?: number
	documents?: IDocument[]
	title?: string
}

export function FavoritesList({
	level = 0,
	documents: parentDocuments,
	title
}: DocumentListProps) {
	const params = useParams()
	const router = useRouter()
	const [expanded, setExpanded] = useState<Record<string, boolean>>({})
	const { favorites: rootFavorites, isPending } = useFavorites()
	const favorites = parentDocuments ?? rootFavorites

	const onExpanded = (documentId: string) => {
		setExpanded(prev => ({
			...prev,
			[documentId]: !prev[documentId]
		}))
	}

	const onRedirect = (documentId: string) => {
		router.push(`/${documentId}`)
	}

	if (isPending && favorites === undefined) {
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

	if (!favorites) return null

	// console.log(JSON.stringify(favorites))
	// const favoriteDocuments = favorites.filter(
	// 	document =>
	// 		document.isFavorited ||
	// 		document.parentDocumentId === parentDocumentId
	// )

	return (
		<>
			{level === 0 && title && (
				<div
					role='button'
					className={cn(
						'text-subtle-foreground group relative flex min-h-[32px] cursor-pointer items-center gap-2 rounded-md px-1 py-1 text-sm font-medium transition-all hover:bg-primary/[.04]'
					)}
				>
					<span className='text-[12px] font-semibold'>{title}</span>
				</div>
			)}

			{favorites.map(document => (
				<div
					key={document.id}
					onClick={e => e.stopPropagation}
					className='cursor-pointer'
				>
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
							paddingLeft: `${(level + 1) * 12}px`
						}}
					>
						{expanded[document.id] && (
							<div
								className='mt-0.5 w-full'
								style={{
									paddingLeft: `${(level + 1) * 12}px`
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
									<FavoritesList
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
