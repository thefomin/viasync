'use client'

import { Cover, Editor } from '@/shared/components/ui/dashboard/document'
import { DndWrapper } from '@/shared/components/ui/dashboard/board'
import { TabList } from '@/shared/components/ui/dashboard'
import { Skeleton } from '@/shared/components/ui'
import { useShared } from '../hooks'
import { Columns } from './columns'
import { Toolbar, ToolbarBoard } from '.'

export default function PreviewId({ documentId }: { documentId: string }) {
	const { shared, isPending } = useShared(documentId)

	if (isPending)
		return (
			<div className='w-full'>
				<Cover.Skeleton />
				<div className='mx-auto mt-10 md:max-w-3xl lg:max-w-4xl'>
					<div className='space-y-4 pl-8 pt-4'>
						<Skeleton className='h-14 w-1/2' />
						<Skeleton className='h-4 w-4/5' />
						<Skeleton className='h-4 w-2/5' />
						<Skeleton className='h-4 w-3/5' />
					</div>
				</div>
			</div>
		)

	if (shared === undefined) {
		return (
			<div className='w-full'>
				<Cover.Skeleton />
				<div className='mx-auto mt-10 md:max-w-3xl lg:max-w-4xl'>
					<div className='space-y-4 pl-8 pt-4'>
						<Skeleton className='h-14 w-1/2' />
						<Skeleton className='h-4 w-4/5' />
						<Skeleton className='h-4 w-2/5' />
						<Skeleton className='h-4 w-3/5' />
					</div>
				</div>
			</div>
		)
	}
	if (!shared) return null
	return (
		<>
			<div className='w-full'>
				<Cover data={shared} isPending={isPending} preview={false} />
				{shared.isBoard ? (
					<div className='h-full'>
						<ToolbarBoard initialData={shared} />
						<TabList />
						<div className='h-full overflow-x-scroll'>
							<DndWrapper>
								<Columns
									initialData={shared}
									className='grid h-full w-fit auto-cols-min grid-flow-col gap-3'
								/>
							</DndWrapper>
						</div>
					</div>
				) : (
					<div className='mx-auto md:max-w-3xl lg:max-w-4xl'>
						<Toolbar initialData={shared} />
						<Editor initialData={shared} editable={false} />
					</div>
				)}
			</div>
		</>
	)
}
