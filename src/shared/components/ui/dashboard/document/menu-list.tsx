import { QueryClientService } from '@/shared/services/document'
import { useQueryClient } from '@tanstack/react-query'
import { MenuItem } from '..'
import { IoStarOutline, IoTrashOutline } from 'react-icons/io5'
import { IDocument } from '@/shared/types/document'
import { useUpdateMutation } from '@/shared/hooks/document'
import { LuStarOff } from 'react-icons/lu'

interface MenuListProps {
	initialData: IDocument
}

export const MenuList = ({ initialData }: MenuListProps) => {
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
	const onRemove = () => {
		queryClientService.updateAllFields(
			initialData,
			{
				isArchived: true,
				isPublished: false
			},
			{ updateArchive: true }
		)
		update({
			id: initialData.id,
			data: {
				isArchived: true,
				isPublished: false
			}
		})
	}
	return (
		<>
			{!initialData.isArchived && (
				<>
					<div className='relative w-full'>
						{initialData.isFavorited ? (
							<MenuItem
								onClick={handleToggleFavorite}
								disabled={isPending}
								icon={LuStarOff}
								label='Remove from Favorites'
							/>
						) : (
							<MenuItem
								onClick={handleToggleFavorite}
								disabled={isPending}
								icon={IoStarOutline}
								label='Add to Favorites'
							/>
						)}
						<div className='absolute -bottom-[5px] left-1 right-1 h-[4px] border-b border-muted-foreground/30'></div>
					</div>

					<div className='mt-[9px] flex flex-col'>
						<MenuItem
							onClick={onRemove}
							disabled={isPending}
							icon={IoTrashOutline}
							label='Move to Trash'
							className='hover:text-[#eb5757]'
						/>
					</div>
					<div className='relative'>
						<div className='absolute left-1 right-1 top-[1px] h-[4px] border-b border-muted-foreground/30'></div>
					</div>
				</>
			)}
		</>
	)
}
