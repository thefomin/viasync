'use client'
import { useGetById } from '@/shared/hooks/document'
import {
	Banner,
	BannerPublish,
	Cover,
	Editor,
	Toolbar
} from '@/shared/components/ui/dashboard/document'
import {
	Columns,
	DndWrapper,
	ToolbarBoard
} from '@/shared/components/ui/dashboard/board'
import { TabList } from '@/shared/components/ui/dashboard'
import { Skeleton } from '@/shared/components/ui'

export default function DocumentId({ documentId }: { documentId: string }) {
	const { document, isPending } = useGetById(documentId)
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

	if (document === undefined) {
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
	if (!document) return null
	return (
		<>
			<div className='mt-[44px] w-full'>
				{document.isArchived && !document.isPublished && (
					<Banner initialData={document} />
				)}
				{document.isPublished && !document.isArchived && (
					<BannerPublish initialData={document} />
				)}
				<Cover data={document} isPending={isPending} preview={true} />
				{document.isBoard ? (
					<div className='h-full'>
						<ToolbarBoard initialData={document} />
						<TabList />
						<div className='h-full overflow-x-scroll'>
							<DndWrapper>
								<Columns
									initialData={document}
									className='grid h-full w-fit auto-cols-min grid-flow-col gap-3'
								/>
							</DndWrapper>
						</div>
					</div>
				) : (
					<div className='mx-auto md:max-w-3xl lg:max-w-4xl'>
						<Toolbar initialData={document} preview={false} />
						<Editor
							initialData={document}
							editable={!document.isArchived}
						/>
					</div>
				)}
			</div>
		</>
	)
}
