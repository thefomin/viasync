'use client'
import { cn } from '@/shared/utils'

import { useDocument } from '@/shared/providers'

import { LuMaximize2 } from 'react-icons/lu'
import { HiOutlineChevronDoubleRight } from 'react-icons/hi2'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/shared/components/ui'
import { Cover, Editor } from '@/shared/components/ui/dashboard/document'
import { ToolbarBoard } from '.'

import { useShared } from '../hooks'
import { Navbar } from '@/shared/components/ui/dashboard/board'
import { colorStyles } from '@/shared/types/document'
import { FaRegCirclePlay } from 'react-icons/fa6'

export function Sidebar() {
	const { documentRef, collapse, isCollapsed, handleMouseDown } =
		useDocument()
	const searchParams = useSearchParams()
	const childDocumentId = searchParams.get('v') || ''
	const { shared } = useShared(childDocumentId)
	const isOpen = Boolean(shared)
	return (
		<>
			<aside
				ref={documentRef}
				className={cn(
					'group/sidebar relative z-[9999] flex h-full border border-l bg-secondary transition-all duration-300 ease-in-out',
					!isOpen && 'pointer-events-none',
					isCollapsed
						? 'invisible w-0 overflow-hidden'
						: 'visible w-auto'
				)}
			>
				{isOpen && shared && (
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
							<Navbar preview={true} />
							<Cover
								data={shared}
								isSidebar={true}
								preview={true}
							/>
							<ToolbarBoard
								initialData={shared}
								isSidebar={true}
							/>
							<div className='relative'>
								{/* <DocumentOptions initialData={shared} /> */}
								<div className='mx-auto w-full max-w-full pl-16 pt-2'>
									<div
										className='relative mb-1 flex w-full items-center'
										style={{
											paddingRight: `calc(64px + env(safe-area-inset-left))`
										}}
									>
										<div className='flex h-[34px] w-48 cursor-pointer flex-row items-center justify-start gap-1.5 rounded-[4px] px-2 text-sm font-medium text-muted-foreground/80 hover:bg-primary/[.04]'>
											<FaRegCirclePlay className='h-3.5 w-3.5 rotate-90' />
											Priority Level
										</div>

										<div className='flex h-[34px] w-full max-w-full cursor-pointer flex-row items-center justify-start gap-1 overflow-hidden text-ellipsis rounded-[4px] px-1.5 text-muted-foreground/80 hover:bg-primary/[.04]'>
											{shared.selectedTag?.name ? (
												<div
													className={`inline-flex h-5 w-full min-w-0 max-w-max items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[3px] px-1.5 text-sm font-medium ${
														colorStyles[
															shared.selectedTag
																?.color ||
																'ORANGE'
														]
													}`}
												>
													<div className='items-center overflow-hidden text-ellipsis whitespace-nowrap'>
														<span className='overflow-hidden text-ellipsis whitespace-nowrap'>
															{
																shared
																	.selectedTag
																	?.name
															}
														</span>
													</div>
												</div>
											) : (
												'Пустой'
											)}
										</div>
									</div>
								</div>
								<div className='absolute -bottom-[12px] left-1 right-1 mx-[60px] h-[4px] border-b border-muted-foreground/10'></div>
							</div>

							<div className='pl-5 pr-[0.6rem]'>
								<Editor
									key={shared.id}
									initialData={shared}
									editable={false}
								/>
							</div>
						</div>
						<div
							onMouseDown={handleMouseDown}
							className='absolute -left-[0.050rem] top-0 h-full w-0.5 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100'
						></div>
					</>
				)}
			</aside>
		</>
	)
}
