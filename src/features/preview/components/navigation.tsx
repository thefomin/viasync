'use client'

import { cn } from '@/shared/utils'
import { useParams } from 'next/navigation'

import { Button } from '@/shared/components/ui'
import { useShared } from '../hooks'

export function Navigation() {
	const params = useParams()
	const documemtId = params.id as string
	const { shared } = useShared(documemtId)
	if (!shared) return null

	return (
		<>
			<div
				className={cn(
					'absolute left-0 top-0 z-[9999] w-full transition-all duration-200 ease-in-out'
				)}
			>
				<nav className='flex h-[44px] w-full items-center gap-x-2 bg-background py-2 pl-3 pr-2.5'>
					<div className='flex w-full items-center justify-between'>
						<Button
							variant='ghost'
							className='flex h-7 max-w-80 flex-row justify-start gap-1 p-1 font-normal'
						>
							{!!shared.icon && (
								<span
									className='inline-flex size-[24px] cursor-pointer select-none items-center justify-center text-lg text-muted-foreground'
									aria-label={shared.icon}
								>
									{shared ? shared.icon : null}
								</span>
							)}
							<span className='max-w-[90%] truncate font-medium'>
								{shared.title || 'Untitled'}
							</span>
						</Button>
					</div>
				</nav>
			</div>
		</>
	)
}
