import { useTags, useUpdateMutation } from '@/shared/hooks/document/tag'
import { QueryClientService } from '@/shared/services/document'
import {
	EnumColor,
	IDocument,
	ITag,
	colorStyles
} from '@/shared/types/document'
import { cn } from '@/shared/utils'
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query'
import { SetStateAction } from 'react'
import { ChangeColor } from '.'

interface TagListProps {
	initialData: IDocument
	value: string
	setValue: React.Dispatch<SetStateAction<string>>
	create: UseMutateFunction<
		ITag,
		Error,
		{
			name?: string | undefined
			color?: string | undefined
		},
		unknown
	>
}

export const TagList = ({
	initialData,
	value,
	setValue,
	create
}: TagListProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const { tags } = useTags()

	const { updateId } = useUpdateMutation()
	const filteredTags = tags?.filter(tag =>
		tag.name?.toLowerCase().includes(value.toLowerCase())
	)
	const handleTagSelect = (id: string, name: string, color: EnumColor) => {
		queryClientService.updateAllFields(initialData, {
			selectedTag: { id, name, color }
		})
		updateId({ id: initialData.id, data: { tagId: id } })

		setValue('')
	}
	const handleCreateTag = (name: string) => {
		setValue(name)
		create({ name, color: 'ORANGE' })
	}
	return (
		<div className='flex flex-col text-sm font-medium'>
			{filteredTags?.map(tag => (
				<div
					key={tag.id}
					role='button'
					onClick={() =>
						handleTagSelect(
							tag.id || '',
							tag.name || '',
							tag.color || 'BROWN'
						)
					}
					className='relative z-10 flex h-[30px] w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-[6px] px-2 text-sm hover:bg-primary/[.04]'
				>
					<div
						className={cn(
							'inline-flex h-5 min-w-0 max-w-48 items-center overflow-hidden text-ellipsis rounded-[3px] bg-muted-foreground/40 px-1.5',
							colorStyles[tag.color || 'ORANGE']
						)}
					>
						{tag.name}
					</div>
					<ChangeColor initialData={initialData} initialTag={tag} />
				</div>
			))}

			{value !== '' && (
				<div
					role='button'
					onClick={() => handleCreateTag(value)}
					className='relative z-10 flex h-[30px] w-full cursor-pointer flex-row items-center gap-2 rounded-[6px] bg-primary/[.04] px-2 text-sm'
				>
					create
					<div
						className={cn(
							'inline-flex h-5 min-w-0 max-w-48 items-center overflow-hidden text-ellipsis rounded-[3px] bg-muted-foreground/40 px-1.5',
							colorStyles['ORANGE']
						)}
					>
						{value}
					</div>
				</div>
			)}
		</div>
	)
}
