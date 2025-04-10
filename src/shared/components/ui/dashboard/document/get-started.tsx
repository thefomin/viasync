'use client'

import { useGetById } from '@/shared/hooks/document'
import { useParams } from 'next/navigation'
import { Button } from '../..'
import { BsLayoutThreeColumns } from 'react-icons/bs'

export const GetStarted = () => {
	const params = useParams()
	const documentId = params.documentId as string
	const { document } = useGetById(documentId)

	if (!document) return null

	return (
		<div className='flex w-full items-center justify-center gap-x-2 py-2 pl-3 pr-2.5'>
			<div className='flex w-full flex-col items-center gap-3'>
				<div className='flex items-start justify-start text-xs font-medium text-muted-foreground/60'>
					Get started with
				</div>
				<div className='flex cursor-pointer items-center justify-center'>
					<div className='flex flex-row gap-2'>
						<Button
							variant='secondary'
							aria-label='share'
							className='h-[32px] rounded-2xl bg-third py-1.5 pl-2.5 pr-3.5 hover:bg-primary/[.04] [&_svg]:size-3'
						>
							<BsLayoutThreeColumns size={30} />
							Board
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
