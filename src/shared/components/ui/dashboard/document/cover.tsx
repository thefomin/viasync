import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Skeleton
} from '@/shared/components/ui'
import { Gallery } from '@/shared/components/ui/gallery'
import { IDocument } from '@/shared/types/document'
import { useUpdateMutation } from '@/shared/hooks/document'
import { useQueryClient } from '@tanstack/react-query'
import { documentApiQuery } from '@/shared/api'
import { cn } from '@/shared/utils'

interface CoverProps {
	data: IDocument
	children?: React.ReactNode
	activeTab?: string
	setActiveTab?: React.Dispatch<React.SetStateAction<string>>
	onClick?: () => void
	isSidebar?: boolean
	isPending?: boolean
	preview?: boolean
}
const Cover = ({ data, isSidebar, isPending, preview }: CoverProps) => {
	if (isPending) return <Cover.Skeleton />
	if (!data.cover) return null

	return (
		<>
			<div
				className={cn(
					'group relative h-[30vh] w-full',
					data.isBoard && 'h-[20vh]',
					isSidebar && 'mt-0 h-[20vh]',
					preview && ''
				)}
			>
				<div className='h-full w-full'>
					{/* <img
					src={data.cover}
					alt={`color-${data.id}`}
					className='block h-[30vh] max-h-72 w-full object-cover transition-opacity duration-300'
				/> */}
					<Image
						src={data.cover}
						alt={`color-${data.id}`}
						fill
						className='object-cover'
						sizes='100vw'
					/>
				</div>
				<div
					className={cn(
						'absolute bottom-5 right-5 flex items-center opacity-0 transition-all duration-100 ease-in group-hover:opacity-100',
						data.isArchived && 'opacity-0'
					)}
				>
					<CoverDropdown data={data}>
						<Button
							variant='outline'
							className='flex h-7 items-center justify-center gap-1.5 rounded-sm border-b-0 border-l-0 border-r border-t-0 pl-1.5 pr-2 text-sm font-normal text-muted-foreground/70 hover:bg-muted disabled:opacity-0'
							disabled={data.isArchived || !preview}
						>
							Поменять
						</Button>
					</CoverDropdown>
					{/* <Button
					variant='outline'
					className='flex h-7 items-center justify-center gap-1.5 rounded-l-none rounded-r-sm border-r border-none pl-1.5 pr-2 text-sm font-normal text-muted-foreground/70 hover:bg-muted disabled:opacity-0'
					disabled={data.isArchived || !preview}
				>
					Переместить
				</Button> */}
				</div>
			</div>
		</>
	)
}
const ChangeCover = ({ data }: CoverProps) => {
	const [activeTab, setActiveTab] = useState('gallery')
	return (
		<div>
			<div className='w-full'>
				<CoverList
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					data={data}
				/>
				<CoverContent activeTab={activeTab} data={data} />
			</div>
		</div>
	)
}

const CoverList = ({ setActiveTab, data }: CoverProps) => {
	const queryClient = useQueryClient()
	const { update } = useUpdateMutation()
	const handleDeleteCover = () => {
		const document = queryClient.getQueryData<IDocument>([
			documentApiQuery.baseKey,
			data.id
		])

		if (document) {
			queryClient.setQueryData<IDocument>(
				[documentApiQuery.baseKey, data.id],
				{ ...document, cover: '' }
			)
		}
		update({
			id: data.id,
			data: {
				cover: ''
			}
		})
	}
	return (
		<div className='relative z-10 flex w-full justify-end border-b border-muted-foreground/30 px-2'>
			<div className='relative min-w-0 flex-shrink-0 whitespace-nowrap pb-1.5 pt-1.5'>
				<Button
					variant='ghost'
					className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04]'
					onClick={() => setActiveTab?.('gallery')}
				>
					Галерея
				</Button>
				<div className='absolute -bottom-[0.8px] left-2 right-2 border border-foreground'></div>
			</div>
			<div className='flex flex-grow items-center justify-end py-2'>
				<Button
					variant='ghost'
					className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04]'
					onClick={handleDeleteCover}
				>
					Удалить
				</Button>
			</div>
		</div>
	)
}

const CoverContent = ({ data }: CoverProps) => {
	const queryClient = useQueryClient()
	const { update } = useUpdateMutation()
	const handleChangeCover = (url: string) => {
		const document = queryClient.getQueryData<IDocument>([
			documentApiQuery.baseKey,
			data.id
		])

		if (document) {
			queryClient.setQueryData<IDocument>(
				[documentApiQuery.baseKey, data.id],
				{ ...document, cover: url }
			)
		}
		update({
			id: data.id,
			data: { cover: url }
		})
	}
	return (
		<div className='m-0 h-[400px] overflow-y-auto'>
			<div className='pb-2'>
				{Gallery.map((gallery, galleryIndex) => (
					<div key={galleryIndex}>
						<div className='flex flex-col gap-1 p-1'>
							<div className='mb-2 mt-1.5 flex px-2 text-xs text-muted-foreground'>
								<div className='flex'>
									<Link href='#' className='-ml-[5px]'>
										<Button
											className='inline-flex h-5 whitespace-nowrap rounded-sm px-[5px] text-xs font-normal text-foreground/70 hover:bg-primary/[.04] hover:text-foreground/70'
											variant='ghost'
										>
											{gallery.title}
										</Button>
									</Link>
								</div>
								<div className='ml-auto'></div>
							</div>
						</div>
						<div className='flex flex-wrap content-start px-3'>
							{gallery.images.map((image, index) => (
								<div
									key={index}
									className='w-1/4 p-[3px]'
									onClick={() => handleChangeCover(image)}
								>
									<div className='contents'>
										<div className='cursor-pointer hover:bg-background/40'>
											<Image
												src={image}
												alt={`color-${index}`}
												height={64}
												width={64}
												className='block h-[64px] w-full rounded-sm object-cover transition-opacity duration-300 hover:opacity-70'
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

const CoverDropdown = ({ data, children }: CoverProps) => {
	return (
		<div>
			<Popover>
				<PopoverTrigger
					asChild
					onClick={() => {
						console.log('click')
					}}
				>
					{children}
				</PopoverTrigger>
				<PopoverContent className='z-[9999999] mr-4 max-h-[485px] w-[500px] overflow-hidden rounded-xl bg-third p-0'>
					<ChangeCover data={data} />
				</PopoverContent>
			</Popover>
		</div>
	)
}

const CoverPreview = ({ data }: CoverProps) => {
	if (!data.cover) return null
	return (
		<div className='group relative h-[30vh] w-full'>
			<div className='h-full w-full'>
				<Image
					src={data.cover}
					alt={`color-${data.id}`}
					fill
					className='object-cover transition-opacity duration-300'
					sizes='100vw'
					priority
				/>
				{/* <img
					src={data.cover}
					alt={`color-${data.id}`}
					className='block h-[30vh] max-h-72 w-full object-cover transition-opacity duration-300'
				/> */}
			</div>
		</div>
	)
}

Cover.Skeleton = function CoverSkeleton({}) {
	return (
		<div className='relative mt-[44px] h-[30vh] w-full'>
			<Skeleton className='h-full w-full rounded-none' />
		</div>
	)
}

export {
	Cover,
	CoverPreview,
	CoverContent,
	CoverList,
	ChangeCover,
	CoverDropdown
}
