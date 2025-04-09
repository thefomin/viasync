import { Plus } from 'lucide-react'

import {
	EnumColor,
	IColumn,
	colorDotStyles,
	colorStyles
} from '@/shared/types/document'
import { CreateDocument, OptionColumn, StatusColor } from '.'
import { Input, Popover, PopoverContent, PopoverTrigger } from '../..'
import { debounce } from 'lodash'
import { useQueryClient } from '@tanstack/react-query'
import { columnApiQuery } from '@/shared/api'
import { useUpdateMutation } from '@/shared/hooks/document/column'

interface BoardStatusProps {
	column: IColumn
	preview?: boolean
}
const debouncedUpdate = debounce(
	(
		updateProfile: (data: { name?: string; color?: EnumColor }) => void,
		data: { name?: string; color?: EnumColor }
	) => {
		updateProfile(data)
	},
	500,
	{ leading: false, trailing: true }
)
export function Status({ column, preview = false }: BoardStatusProps) {
	const queryClient = useQueryClient()
	const { update } = useUpdateMutation()
	const updateCol = (newData: Partial<IColumn>) => {
		const cols = queryClient.getQueryData<IColumn[]>([
			columnApiQuery.baseKey,
			column.parentDocumentId
		])
		if (!cols) {
			console.error('Колонки не найден')
			return
		}
		const updatedCols = cols.map(col => {
			if (col.id === column.id) {
				return { ...col, ...newData } // Обновляем только нужную колонку
			}
			return col // Остальные без изменений
		})
		queryClient.setQueryData<IColumn[]>(
			[columnApiQuery.baseKey, column.parentDocumentId],
			updatedCols
		)
	}
	const onChange = (value: string) => {
		updateCol({ name: value })

		debouncedUpdate(
			data =>
				update({
					columnId: column.id,
					data: {
						parentDocumentId: column.parentDocumentId,
						name: data.name
					}
				}),
			{ name: value }
		)
	}

	const changeColor = (color: EnumColor) => {
		updateCol({ color })
		debouncedUpdate(
			data =>
				update({
					columnId: column.id,
					data: {
						parentDocumentId: column.parentDocumentId,
						color: data.color
					}
				}),
			{ color }
		)
	}

	return (
		<div
			className='group sticky top-0 z-50 flex w-full flex-row items-center justify-between bg-background pb-3 pt-0'
			key={column.id}
		>
			<div className='flex flex-row items-center gap-1'>
				{!preview && (
					<Popover>
						<PopoverTrigger asChild>
							<div
								className={`flex cursor-pointer flex-row items-center gap-1.5 rounded-full px-2 ${
									colorStyles[
										(column.color || 'DEFAULT') as EnumColor
									]
								}`}
							>
								<div
									className={`h-2 w-2 rounded-full ${
										colorDotStyles[
											(column.color ||
												'DEFAULT') as EnumColor
										]
									}`}
								></div>

								<h3 className='text-sm font-semibold first-letter:uppercase'>
									{column.name || 'Без имени'}
								</h3>
							</div>
						</PopoverTrigger>
						<PopoverContent
							className='z-[99999] flex h-auto w-80 rounded-xl border-muted-foreground/10 bg-third p-1 px-2'
							align='start'
						>
							<div className='flex w-full flex-row items-center gap-1.5'>
								<StatusColor
									column={column}
									onClick={changeColor}
								>
									<div
										className={`h-[30px] w-[30px] rounded-sm border border-primary/10 p-0.5 ${
											colorStyles[
												(column.color ||
													'DEFAULT') as EnumColor
											]
										}`}
									>
										<span className='inline-flex size-[24px] cursor-pointer select-none items-center justify-center text-lg text-muted-foreground'></span>
									</div>
								</StatusColor>
								<Input
									placeholder='Без имени'
									value={column.name || ''}
									onChange={e => {
										onChange(e.target.value)
									}}
									className='h-[30px] w-full resize-none break-words rounded-sm border border-primary/10 bg-primary/5 px-2 py-0.5 text-foreground outline-none focus:ring-0'
								/>
							</div>
						</PopoverContent>
					</Popover>
				)}
				{preview && (
					<div
						className={`flex cursor-pointer flex-row items-center gap-1.5 rounded-full px-2 ${
							colorStyles[
								(column.color || 'DEFAULT') as EnumColor
							]
						}`}
					>
						<div
							className={`h-2 w-2 rounded-full ${
								colorDotStyles[
									(column.color || 'DEFAULT') as EnumColor
								]
							}`}
						></div>

						<h3 className='text-sm font-semibold first-letter:uppercase'>
							{column.name || 'Без имени'}
						</h3>
					</div>
				)}
				<div className='flex h-8 w-8 items-center justify-center'>
					<span className='flex items-center justify-center text-sm font-medium text-muted-foreground'>
						{column.documents.length || '0'}
					</span>
				</div>
			</div>
			{!preview && (
				<div className='flex flex-row items-center gap-1'>
					{!column.protected && <OptionColumn column={column} />}
					<CreateDocument
						column={column}
						size='icon'
						variant='ghost'
						className='opacity-0 group-hover:opacity-100'
					>
						<Plus className='h-6 w-6' />
					</CreateDocument>
				</div>
			)}
		</div>
	)
}
