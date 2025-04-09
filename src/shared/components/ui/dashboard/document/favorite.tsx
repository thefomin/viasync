'use client'

import { Button } from '../..'
import { IoStarOutline, IoStar } from 'react-icons/io5'
import { useUpdateMutation } from '@/shared/hooks/document'
import { IDocument } from '@/shared/types/document'
import { useQueryClient } from '@tanstack/react-query'
import { QueryClientService } from '@/shared/services/document'

interface FavoriteProps {
	initialData: IDocument
}

export const Favorite = ({ initialData }: FavoriteProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const { update, isPending } = useUpdateMutation()
	const handleToggleFavorite = () => {
		queryClientService.updateAllFields(
			initialData,
			{
				isFavorited: !initialData.isFavorited,
				updatedAt: new Date().toISOString()
			},
			{ updateFavorites: true }
		)
		update({
			id: initialData.id,
			data: {
				isFavorited: !initialData.isFavorited,
				updatedAt: new Date().toISOString()
			}
		})
	}
	return (
		<Button
			variant='ghost'
			aria-label='share'
			onClick={handleToggleFavorite}
			className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04] [&_svg]:size-[18px]'
			disabled={isPending}
		>
			{initialData.isFavorited ? (
				<IoStar className='h-8 w-8 fill-yellow-600' />
			) : (
				<IoStarOutline className='h-8 w-8 fill-yellow-600' />
			)}
		</Button>
	)
}
