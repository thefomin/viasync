'use client'
import { cn } from '@/shared/utils'

import { useDocument } from '@/shared/providers'
import { Button } from '../..'
import { LuMaximize2 } from 'react-icons/lu'
import { HiOutlineChevronDoubleRight } from 'react-icons/hi2'
import { useGetById } from '@/shared/hooks/document'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '.'
import { ToolbarBoard } from '../board'
import { Banner, BannerPublish, Cover, Editor } from '../document'

export function Sidebar() {
	const { documentRef, collapse, isCollapsed, handleMouseDown } =
		useDocument()
	const searchParams = useSearchParams()
	const childDocumentId = searchParams.get('v') || ''
	const { document } = useGetById(childDocumentId)
	const isOpen = Boolean(document)
	return (
		<>
			<aside
				ref={documentRef}
				className={cn(
					'group/sidebar relative z-[9999] flex h-full border border-l bg-third transition-all duration-300 ease-in-out',
					!isOpen && 'pointer-events-none scale-x-95 opacity-0',
					isCollapsed
						? 'invisible w-0 overflow-hidden'
						: 'visible w-auto'
				)}
				style={{
					width: isCollapsed ? '0px' : '560px',
					transition: 'width 0.3s ease, opacity 0.3s ease'
				}}
			>
				{isOpen && document && (
					<>
						<div
							className={cn(
								'absolute left-3.5 top-1.5 z-50 flex gap-0.5 opacity-100'
							)}
						>
							<Button
								size='icon'
								variant='ghost'
								className='focus-ring transition-bg-ease inline-flex size-[28px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
								onClick={collapse}
							>
								<HiOutlineChevronDoubleRight className='h-6 w-6 opacity-100 transition' />
							</Button>
							<Button
								size='icon'
								variant='ghost'
								className='focus-ring transition-bg-ease inline-flex size-[28px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
							>
								<LuMaximize2 className='h-6 w-6 -scale-x-100 opacity-100 transition' />
							</Button>
						</div>

						<div className='relative flex w-full flex-col'>
							<Navbar />
							{document.isArchived && !document.isPublished && (
								<Banner initialData={document} />
							)}
							{document.isPublished && !document.isArchived && (
								<BannerPublish initialData={document} />
							)}
							<Cover data={document} isSidebar={true} />
							<ToolbarBoard
								key={document.id}
								initialData={document}
								isSidebar={true}
							/>

							<div className='pl-5 pr-[0.6rem]'>
								<Editor
									key={document.id}
									initialData={document}
								/>
							</div>
						</div>
						<div
							onMouseDown={handleMouseDown}
							className='absolute -left-[0.050rem] top-0 z-[99999] h-full w-0.5 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100'
						></div>
					</>
				)}
			</aside>
		</>
	)
}
