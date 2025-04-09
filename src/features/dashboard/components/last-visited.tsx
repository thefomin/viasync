'use client'
import dynamic from 'next/dynamic'
const LastVisitedCarousel = dynamic(
	() => import('@/shared/components/ui/dashboard/last-visited'),
	{
		ssr: false
	}
)
import { useLastVisited } from '@/shared/hooks/document'
import { Clock3 } from 'lucide-react'

export function LastVisited() {
	const { lastVisited } = useLastVisited()
	if (!lastVisited) return null
	return (
		<div className='flex flex-col gap-6 text-foreground'>
			{lastVisited.length > 0 ? (
				<div className='flex flex-col'>
					<div className='relative mx-auto h-12 w-full max-w-full items-center justify-between px-4 md:max-w-4xl md:px-12'>
						<div className='ml-2 flex h-full flex-row items-center gap-2 font-medium text-muted-foreground/60'>
							<Clock3 className='h-3.5 w-3.5' />
							<span className='text-ellipsis whitespace-nowrap text-xs font-semibold'>
								Recently visited
							</span>
						</div>
					</div>

					<LastVisitedCarousel initialData={lastVisited} />
				</div>
			) : null}
		</div>
	)
}
