import { QueryClientService } from '@/shared/services/document'
import { useQueryClient } from '@tanstack/react-query'
import { MenuItem, Title } from '.'
import { Button } from '..'
import { IoStarOutline, IoTrashOutline } from 'react-icons/io5'
import { SquarePen } from 'lucide-react'
import { IDocument } from '@/shared/types/document'
import { useDateTime, useUpdateMutation } from '@/shared/hooks/document'
import { LuStarOff } from 'react-icons/lu'

interface MenuListProps {
	document: IDocument
}

export const MenuList = ({ document }: MenuListProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const { createdAt, updatedAt } = useDateTime(document)
	const { update, isPending } = useUpdateMutation()
	const handleToggleFavorite = () => {
		queryClientService.updateAllFields(
			document,
			{
				isFavorited: !document.isFavorited,
				updatedAt: new Date().toISOString()
			},
			{ updateFavorites: true }
		)
		update({
			id: document.id,
			data: {
				isFavorited: !document.isFavorited,
				updatedAt: new Date().toISOString()
			}
		})
	}
	const onRemove = () => {
		queryClientService.updateAllFields(
			document,
			{
				isArchived: true,
				isPublished: false
			},
			{ updateArchive: true }
		)
		update({
			id: document.id,
			data: {
				isArchived: true,
				isPublished: false
			}
		})
	}
	return (
		<>
			<div className='relative w-full'>
				{document.isFavorited ? (
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
				<Title initialData={document}>
					<Button
						variant='ghost'
						aria-label='share'
						className='h-[30px] w-full justify-start rounded-md px-2 hover:bg-primary/[.04]'
					>
						<SquarePen className='h-8 w-8' />
						Rename
					</Button>
				</Title>

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
			<div className='mt-[9px] flex flex-col gap-1 p-2 text-xs font-medium text-muted-foreground/60'>
				<span>Created {createdAt}</span>
				<span>Edited {updatedAt}</span>
			</div>
		</>
	)
}
