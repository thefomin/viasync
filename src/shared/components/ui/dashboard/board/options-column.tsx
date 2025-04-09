import { MoreHorizontal } from 'lucide-react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '../..'
import { MenuItem } from '..'
import { useDeleteMutation } from '@/shared/hooks/document/column'
import { IoTrashOutline } from 'react-icons/io5'
import { IColumn } from '@/shared/types/document'
import { useQueryClient } from '@tanstack/react-query'
import { columnApiQuery } from '@/shared/api'

interface OptionsColProps {
	column: IColumn
}

export const OptionColumn = ({ column }: OptionsColProps) => {
	const queryClient = useQueryClient()
	const { deleteColumn, isPendingDelete } = useDeleteMutation()

	const onRemove = () => {
		const cols = queryClient.getQueryData<IColumn[]>([
			columnApiQuery.baseKey,
			column.parentDocumentId
		])
		if (!cols) {
			console.error('Колонки не найден')
			return
		}
		const updatedCols = cols.filter(col => col.id !== column.id)

		queryClient.setQueryData<IColumn[]>(
			[columnApiQuery.baseKey, column.parentDocumentId],
			updatedCols
		)
		deleteColumn({ columnId: column.id })
	}
	return (
		<Popover>
			<PopoverTrigger asChild onClick={e => e.stopPropagation()}>
				<Button
					variant='ghost'
					size='icon'
					aria-label='more'
					className='relative z-50 flex h-5 w-5 items-center justify-center rounded-md p-3 text-muted-foreground opacity-0 hover:text-foreground focus:outline-none focus:ring-0 group-hover:opacity-100'
				>
					<MoreHorizontal className='h-8 w-8' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='z-[99999] w-[265px] rounded-xl border border-muted-foreground/20 bg-third p-1'
				align='start'
				alignOffset={8}
				forceMount
				onClick={e => e.stopPropagation()}
			>
				<div className='flex flex-col gap-1 p-2 text-xs font-medium text-muted-foreground/60'>
					<div className='flex flex-col'>
						<MenuItem
							onClick={onRemove}
							disabled={isPendingDelete}
							icon={IoTrashOutline}
							label='Delete'
							className='hover:text-[#eb5757]'
						/>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
