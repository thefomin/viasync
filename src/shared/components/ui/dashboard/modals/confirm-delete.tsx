'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/shared/components/ui'
import { PropsWithChildren } from 'react'

interface ConfirmmModalProps {
	children: React.ReactNode
	onConfirm: () => void
}
export const ConfirmDelete = ({
	children,
	onConfirm
}: PropsWithChildren<ConfirmmModalProps>) => {
	const handleConfirm = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.stopPropagation()
		e.preventDefault()
		onConfirm()
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className='h-44 w-80 gap-1 rounded-2xl bg-third p-5 sm:rounded-2xl'>
				<AlertDialogHeader>
					<AlertDialogTitle className='flex items-center text-center text-base sm:text-center'>
						Are you sure you want to delete this document from
						Trash?
					</AlertDialogTitle>
					<AlertDialogDescription className='sr-only'>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='flex flex-col justify-center gap-2.5 sm:flex-col sm:justify-center sm:space-x-0'>
					<AlertDialogAction
						onClick={handleConfirm}
						className='h-8 border border-[#522e2a] bg-transparent font-medium text-[#eb5757] hover:bg-[#522e2a] sm:m-0'
					>
						Delete document
					</AlertDialogAction>
					<AlertDialogCancel className='m-0 h-8 w-full border-muted-foreground/30 bg-transparent p-0 font-medium hover:bg-primary/[.04] sm:m-0'>
						Cancel
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
