'use client'
import { IDocument } from '@/shared/types/document'
import { Button, Input } from '../..'
import { Check, Copy } from 'lucide-react'
import { IoIosGlobe } from 'react-icons/io'
import { documentApiQuery } from '@/shared/api'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateMutation } from '@/shared/hooks/document'
import { toast } from 'sonner'
import { QueryClientService } from '@/shared/services/document'

interface PublishProps {
	initialData: IDocument
}

export const Publish = ({ initialData }: PublishProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const { update, isPending } = useUpdateMutation()
	const [isCopied, setIsCopied] = useState(false)

	const handlePublish = () => {
		const document = queryClient.getQueryData<IDocument>([
			documentApiQuery.baseKey,
			initialData.id
		])

		if (document) {
			queryClient.setQueryData<IDocument>(
				[documentApiQuery.baseKey, initialData.id],
				{ ...document, isPublished: true }
			)
		}
		update({
			id: initialData?.id,
			data: { isPublished: true }
		})
	}
	const handleCancelPublish = () => {
		const document = queryClient.getQueryData<IDocument>([
			documentApiQuery.baseKey,
			initialData.id
		])

		if (document) {
			queryClient.setQueryData<IDocument>(
				[documentApiQuery.baseKey, initialData.id],
				{ ...document, isPublished: false }
			)
		}
		update({
			id: initialData.id,
			data: { isPublished: false }
		})
	}

	const onCopy = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value)
			setIsCopied(true)
			toast.success('Успешно скопирован')
			setTimeout(() => setIsCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
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
		<div className='p-2'>
			{initialData.isPublished ? (
				<div className='space-y-4'>
					<div className='flex h-8 items-center rounded-sm border border-primary/20 bg-background px-2'>
						<Input
							disabled
							className='h-7 flex-1 truncate rounded-r-none border border-transparent px-3 pl-0 text-sm leading-none disabled:pointer-events-none disabled:text-foreground'
							value={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/preview/${initialData.id}`}
						/>
						<Button
							variant='ghost'
							className='h-7 rounded-md border-none px-2 hover:bg-primary/[.04]'
							onClick={() =>
								onCopy(
									`${process.env.NEXT_PUBLIC_DOMAIN_URL}/preview/${initialData.id}`
								)
							}
						>
							{isCopied ? (
								<Check className='h-1 w-1' />
							) : (
								<Copy className='h-1 w-1' />
							)}
						</Button>
					</div>
					<Button
						className='h-8 w-full'
						onClick={handleCancelPublish}
						disabled={isPending}
					>
						Отменить
					</Button>
				</div>
			) : (
				<div className='flex flex-col items-center justify-center'>
					{initialData.isArchived ? (
						<>
							<div className='mt-6 flex flex-col items-center text-center'>
								<div className='flex flex-col items-center gap-3'>
									<IoIosGlobe className='mb-2 h-8 w-8 text-muted-foreground' />
									<div className='mb-6 flex w-full items-center justify-center text-sm font-medium'>
										Вы не можете опубликовать документ, пока
										он находится в корзине
									</div>
								</div>
								<div className='mb-4 text-xs text-muted-foreground'>
									<Button
										variant='ghost'
										className='h-7 border border-muted-foreground/30 bg-transparent p-1 px-2 text-sm font-medium text-white transition hover:bg-muted-foreground/10'
										onClick={onRestore}
									>
										Restore page
									</Button>
								</div>
							</div>
						</>
					) : (
						<>
							<div className='mt-4 flex flex-col items-center'>
								<IoIosGlobe className='mb-2 h-8 w-8 text-muted-foreground' />
								<div className='mb-2 text-sm font-medium'>
									Опубликовать в сети
								</div>
								<span className='mb-4 text-xs text-muted-foreground'>
									Поделитесь своей работой с другими
								</span>
							</div>
							<Button
								className='h-8 w-full border border-muted-foreground/20 bg-[#2383e2] text-white hover:bg-[#0077d4]'
								onClick={handlePublish}
								disabled={isPending || initialData.isArchived}
							>
								Опубликовать
							</Button>
						</>
					)}
				</div>
			)}
		</div>
	)
}
