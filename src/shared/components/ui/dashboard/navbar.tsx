'use client'

import { MenuIcon } from 'lucide-react'

import { Title } from '.'
import { useGetById } from '@/shared/hooks/document'
import { useParams } from 'next/navigation'
import { Button } from '..'
import { Favorite, LastEdited, Menu, Share } from './document'

interface NavbarProps {
	isCollapsed: boolean
	onResetWidth: () => void
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
	const params = useParams()
	const documentId = params.documentId as string

	const { document, isPending } = useGetById(documentId)
	if (isPending && document === undefined) {
		return (
			<nav className='flex w-full items-center justify-between bg-background px-3 py-2 dark:bg-[#1F1F1F]'>
				<Title.Skeleton />
			</nav>
		)
	}

	if (!document) return null
	return (
		<>
			<nav className='flex h-[44px] w-full items-center gap-x-2 bg-background py-2 pl-3 pr-2.5'>
				{isCollapsed && (
					<Button
						variant='ghost'
						size='icon'
						aria-label='Menu'
						onClick={onResetWidth}
						className='focus-ring transition-bg-ease inline-flex size-[28px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
					>
						<MenuIcon className='h-6 w-6 text-muted-foreground' />
					</Button>
				)}
				<div className='flex w-full items-center justify-between'>
					<Title initialData={document}>
						<Button
							variant='ghost'
							className='flex h-7 max-w-80 flex-row justify-start gap-1 p-1 font-normal'
						>
							{!!document.icon && (
								<span
									className='inline-flex size-[24px] cursor-pointer select-none items-center justify-center text-lg text-muted-foreground'
									aria-label={document.icon}
								>
									{document ? document.icon : null}
								</span>
							)}
							<span className='max-w-[90%] truncate font-medium'>
								{document.title || 'Untitled'}
							</span>
						</Button>
					</Title>
					<div className='flex items-center gap-x-2'>
						<LastEdited initialData={document} />
						<Share initialData={document} />
						<Favorite initialData={document} />
						<Menu initialData={document} />
					</div>
				</div>
			</nav>
		</>
	)
}
