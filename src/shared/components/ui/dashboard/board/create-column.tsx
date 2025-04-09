'use client'

import { Plus } from 'lucide-react'

import { Button } from '@/shared/components/ui'
import { cn } from '@/shared/utils'
import { useCreateMutation } from '@/shared/hooks/document/column'
import { useProfile } from '@/shared/hooks/user'

export function CreateColumn({
	parentDocumentId,
	className
}: {
	parentDocumentId: string
	className?: string
}) {
	const { user } = useProfile()

	const { create, isPending } = useCreateMutation()

	if (!user) return null

	const handleCreateColumn = () => {
		create({
			parentDocumentId,
			userId: user.id
		})
	}

	return (
		<div className={cn('flex flex-col justify-center', className)}>
			<Button
				variant='ghost'
				onClick={handleCreateColumn}
				disabled={isPending}
				size='lg'
				className='inline-flex h-full w-full min-w-0 cursor-pointer justify-center whitespace-nowrap rounded-xl border border-card-secondary/[0.05] px-4 py-3 text-card-secondary/[0.28]'
			>
				Создать колонку
				<Plus className='h-5 w-5' />
			</Button>
		</div>
	)
}
