'use client'

import { ChevronDown, ChevronRight, LucideIcon, Plus } from 'lucide-react'
import { Button, Skeleton } from '..'
import { cn } from '@/shared/utils'
import { useCreateMutation } from '@/shared/hooks/document'
import { Menu } from '.'
import { TbPointFilled } from 'react-icons/tb'
import { IDocument } from '@/shared/types/document'
import { useColumns } from '@/shared/hooks/document/column'
import { useQueryClient } from '@tanstack/react-query'
import { columnApiQuery } from '@/shared/api'

interface DocumentItemProps {
	id?: string
	documentIcon?: string
	label: string
	onClick?: () => void
	active?: boolean
	expanded?: boolean
	isSearch?: boolean
	level?: number
	onExpand?: () => void
	icon?: LucideIcon
	viewType: string
	document: IDocument
}

export function Item({
	id,
	label,
	onClick,
	icon: Icon,
	active,
	documentIcon,
	viewType,
	onExpand,
	expanded,
	document
}: DocumentItemProps) {
	const queryClient = useQueryClient()
	const handleExpand: React.MouseEventHandler<HTMLButtonElement> = event => {
		event.stopPropagation()
		onExpand?.()
	}
	const { create, isPending } = useCreateMutation()
	const { columns } = useColumns(document.id)
	const handleCreateDocument = () => {
		create(
			{
				parentDocumentId: id,
				title: '',
				description: '',
				...(document.isBoard &&
					columns &&
					columns?.length > 0 && { columnId: columns[0].id })
			},

			{
				onSuccess: async () => {
					await queryClient.invalidateQueries({
						queryKey: [columnApiQuery.baseKey, document.id]
					})
				}
			}
		)
	}

	const ChevronIcon = expanded ? ChevronDown : ChevronRight
	return (
		<div
			role='button'
			onClick={onClick}
			className={cn(
				'text-subtle-foreground group relative z-[9999] flex min-h-[32px] cursor-pointer items-center gap-2 rounded-md px-1 py-1 pr-0.5 text-sm font-medium transition-all hover:bg-primary/[.04]',
				active && 'bg-primary/5 text-primary'
			)}
		>
			{!!id && !viewType && (
				<div className='absolute left-1 top-1 z-[99999]'>
					<Button
						size='icon'
						variant='ghost'
						className='focus-ring transition-bg-ease inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
						onClick={handleExpand}
					>
						<ChevronIcon className='h-6 w-6 opacity-0 transition group-hover:opacity-100' />
					</Button>
				</div>
			)}

			{!!id && !viewType && (
				<div className='absolute right-1 top-1 z-[99999] flex flex-row gap-1'>
					<Menu documentId={id} />

					<Button
						size='icon'
						variant='ghost'
						className='focus-ring transition-bg-ease z-[999999] inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
						onClick={handleCreateDocument}
						disabled={isPending}
					>
						<Plus className='h-6 w-6 opacity-0 transition group-hover:opacity-100' />
					</Button>
				</div>
			)}
			<div
				className={cn(
					'w-auto opacity-100 group-hover:opacity-0',
					viewType && 'group-hover:opacity-100'
				)}
			>
				{viewType ? (
					<TbPointFilled className='h-3.5 w-3.5 transition' />
				) : documentIcon ? (
					<div className='focus-ring transition-bg-ease inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
						<span aria-label={documentIcon} className='text-lg'>
							{documentIcon}
						</span>
					</div>
				) : (
					<>
						{Icon ? (
							<Icon className='h-[18px] shrink-0 text-muted-foreground' />
						) : null}
					</>
				)}
			</div>

			<span className='max-w-[60%] truncate text-sm'>{label}</span>
		</div>
	)
}

Item.Skeleton = function ItemSkeleton({
	level,
	width
}: {
	level?: number
	width?: number
}) {
	const skeletonWidth = width
		? width === 1
			? '80%' // для уровня 1
			: width === 2
				? '60%' // для уровня 2
				: '40%' // для уровня 3+
		: '90%'
	return (
		<div
			style={{ paddingLeft: level ? `${level * 12 + 25}px` : '4px' }}
			className='flex items-center gap-2 px-1 py-1 pr-0.5'
		>
			<div className='h-6 w-6'>
				<Skeleton className='h-full w-6' />
			</div>
			<Skeleton className='h-3' style={{ width: skeletonWidth }} />
		</div>
	)
}
