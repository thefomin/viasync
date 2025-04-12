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
import { useProfile } from '@/shared/hooks/user'
import { Skeleton } from '@/shared/components/ui'

export function LastVisited() {
	const { user } = useProfile()
	const { lastVisited, isPending } = useLastVisited()
	if (isPending)
		return (
			<div className='flex flex-col gap-6 text-foreground'>
				<div className='flex flex-col'>
					<div className='relative mx-auto h-12 w-full max-w-full items-center justify-between px-4 md:max-w-4xl md:px-12'>
						<div className='ml-2 flex h-full flex-row items-center gap-2 font-medium text-muted-foreground/60'>
							<Skeleton className='ml-2 h-3.5 w-24 rounded-md px-2 py-2 text-2xl font-bold md:text-3xl' />
						</div>
					</div>
					<div className='relative mx-auto w-full max-w-full items-center justify-between px-4 md:max-w-4xl md:px-12'>
						<div className='flex flex-row gap-4'>
							{Array.from({ length: 4 }).map((_, index) => (
								<LastVisited.Skeleton key={index} />
							))}
						</div>
					</div>
				</div>
			</div>
		)
	if (!lastVisited) return null
	if (!user) return null
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

LastVisited.Skeleton = function CardSkeleton() {
	return <Skeleton className='h-[144px] w-[144px] rounded-xl' />
}
