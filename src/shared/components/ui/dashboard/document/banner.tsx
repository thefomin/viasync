'use client'

import { IDocument } from '@/shared/types/document'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '../..'
import { LuUndo2 } from 'react-icons/lu'
import { IoTrashOutline } from 'react-icons/io5'
import { useDeleteMutation, useUpdateMutation } from '@/shared/hooks/document'
import { useQueryClient } from '@tanstack/react-query'
import { QueryClientService } from '@/shared/services/document'
import { IoIosGlobe } from 'react-icons/io'
import Link from 'next/link'

interface BannerProps {
	initialData: IDocument
}

const Banner = ({ initialData }: BannerProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const params = useParams()
	const router = useRouter()
	const { update } = useUpdateMutation()
	const { deleteDocument } = useDeleteMutation()
	const onRemove = () => {
		queryClientService.updateAllFields(
			initialData,
			{ id: initialData.id },
			{ updateArchive: true },
			initialData.id
		)
		deleteDocument(initialData.id)
		if (params.documentId === initialData.id) {
			router.push('/')
		}
	}

	const onRestore = () => {
		queryClientService.updateAllFields(
			initialData,
			{
				isArchived: false
			},
			{ updateFavorites: true, updateArchive: true }
		)

		update({
			id: initialData.id,
			data: {
				isArchived: false
			}
		})
	}

	return (
		<div className='flex w-full items-center justify-center gap-x-2 bg-[#eb5757] p-2 text-center text-sm text-white'>
			<p className='font-medium'>
				Эта страница находится{' '}
				<span className='font-bold'>в корзине.</span>
			</p>
			<Button
				onClick={onRestore}
				variant='ghost'
				className='h-7 border border-white bg-transparent p-1 px-2 text-sm font-medium text-white transition hover:bg-muted-foreground/10'
			>
				<LuUndo2 className='h-6 w-6 opacity-100 transition' />
				Restore page
			</Button>
			<Button
				variant='ghost'
				className='h-7 border border-white bg-transparent p-1 px-2 text-sm font-medium text-white transition hover:bg-muted-foreground/10'
				onClick={onRemove}
			>
				<IoTrashOutline className='h-6 w-6 opacity-100 transition' />
				Delete forever
			</Button>
		</div>
	)
}

const BannerPublish = ({ initialData }: BannerProps) => {
	return (
		<div className='flex w-full items-center justify-center gap-x-2 bg-[#1b252e] p-2 text-center text-sm text-[#2383e2]'>
			<p className='font-medium'>
				Эта страница находится на{' '}
				<span className='font-bold'>viasync.cloud</span>
			</p>
			<Button
				variant='ghost'
				className='h-7 border border-[#2383e2] bg-transparent p-1 px-2 text-sm font-medium text-[#2383e2] transition hover:bg-muted-foreground/10 hover:text-[#2383e2]'
				asChild
			>
				<Link href={`/preview/${initialData.id}`} target='_blank'>
					<IoIosGlobe className='h-6 w-6 opacity-100 transition' />
					View site
				</Link>
			</Button>
		</div>
	)
}

export { Banner, BannerPublish }
