'use client'

import { Button } from '@/shared/components/ui'
import { cn } from '@/shared/utils'
import { IColumn } from '@/shared/types/document'
import { useCreateMutation } from '@/shared/hooks/document'

import { useQueryClient } from '@tanstack/react-query'
import { QueryClientService } from '@/shared/services/document/column'
import { columnApiQuery } from '@/shared/api'

interface CreateFormProps {
	column?: IColumn
	children?: React.ReactNode
	className?: string
	size?: 'icon' | 'default' | 'sm' | 'lg' | null | undefined
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| null
		| undefined
}

export function CreateDocument({
	column,
	children,
	className,
	size,
	variant
}: CreateFormProps) {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)

	const { create, isPending } = useCreateMutation()

	if (!column) return null
	const handleCreate = () => {
		queryClientService.updateAllFields(column)
		create(
			{
				columnId: column.id,
				parentDocumentId: column.parentDocumentId,
				title: ''
			},
			{
				onSuccess: async () => {
					await queryClient.invalidateQueries({
						queryKey: [
							columnApiQuery.baseKey,
							column.parentDocumentId
						]
					})
				}
			}
		)
	}
	return (
		<Button
			size={size}
			onClick={handleCreate}
			disabled={isPending}
			className={cn(
				'relative z-50 flex h-5 w-5 items-center justify-center rounded-md p-3 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-0',
				className
			)}
			variant={variant}
		>
			{children}
		</Button>
	)
}
