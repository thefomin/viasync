'use client'

import { cn } from '@/shared/utils'
import { ChevronsLeft, MenuIcon, SquarePen } from 'lucide-react'
import { GoHome } from 'react-icons/go'
import { useParams } from 'next/navigation'

import { useMediaQuery } from 'usehooks-ts'
import {
	DocumentList,
	FavoritesList,
	NavItem,
	Navbar,
	Sidebar,
	Trash,
	UserItem
} from '.'
import { Button } from '..'
import { GetStarted } from './document'
import { useCreateMutation } from '@/shared/hooks/document'
import { useDocument, useSidebar } from '@/shared/providers'
import { Settings } from './modals'

export function Navigation() {
	const params = useParams()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const { create, isPending } = useCreateMutation()
	const {
		navbarRef,
		isResetting,
		isCollapsed,
		resetWidth,
		collapse,
		handleMouseDown
	} = useSidebar()

	const { resetWidthLeft } = useDocument()
	const handleCreate = () => {
		create({ title: '' })
	}
	return (
		<>
			<Sidebar>
				<div
					className={cn(
						'absolute right-3.5 top-2 z-50 flex gap-0.5 opacity-100',
						isMobile && 'opacity-100'
					)}
				>
					<Button
						size='icon'
						variant='ghost'
						className='focus-ring transition-bg-ease inline-flex size-[28px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
						onClick={collapse}
					>
						<ChevronsLeft className='h-6 w-6 opacity-0 transition group-hover/sidebar:opacity-100' />
					</Button>
					<Button
						size='icon'
						variant='ghost'
						className='focus-ring transition-bg-ease inline-flex size-[28px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
						onClick={handleCreate}
						disabled={isPending}
					>
						<SquarePen className='h-6 w-6 opacity-100 transition' />
					</Button>
				</div>
				<div className='h-[44px]'>
					<UserItem />
				</div>

				<div className='mx-2 flex flex-grow-0 cursor-pointer flex-col gap-0.5 pb-2'>
					{/* <Item onClick={() => {}} label='Главная' icon={Home} /> */}
					<NavItem title='Home' icon={GoHome} href='/' />
				</div>
				<div className='mx-2 flex flex-grow-0 cursor-pointer flex-col gap-0.5 pb-2'>
					<FavoritesList title='Favorites' />

					<DocumentList title='Private' />
				</div>
				<div className='mx-2 mt-4 flex flex-grow-0 cursor-pointer flex-col gap-0.5 pb-2'>
					<Trash />
					{/* <NavItem title='Settings' icon={FiSettings} href='/sett' /> */}
					<Settings />
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className='absolute -right-[0.050rem] top-0 h-full w-0.5 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100'
				></div>
			</Sidebar>

			<div
				ref={navbarRef}
				className={cn(
					'absolute left-60 top-0 z-[9999] w-[calc(100%-250px)] transition-all duration-200 ease-in-out',
					isResetting && 'transition-all duration-300 ease-in-out',
					isMobile && 'left-0 w-full'
				)}
				style={{ left: '250px' }}
			>
				{!!params.documentId ? (
					<Navbar
						isCollapsed={isCollapsed}
						onResetWidth={resetWidthLeft}
					/>
				) : (
					<nav
						className={cn(
							'w-full bg-transparent px-3 py-2',
							!isCollapsed && 'p-0'
						)}
					>
						{isCollapsed && (
							<MenuIcon
								onClick={resetWidthLeft}
								role='button'
								className='h-6 w-6 text-muted-foreground'
							/>
						)}
					</nav>
				)}
			</div>
			{/* <div
				ref={getStartedRef}
				className={cn(
					'absolute bottom-7 left-60 z-[9999] w-[calc(100%-250px)]',
					isResetting && 'transition-all duration-300 ease-in-out',
					isMobile && 'left-0 w-full'
				)}
				style={{ left: '250px' }}
			>
				{!!params.documentId && <GetStarted />}
			</div> */}
		</>
	)
}
