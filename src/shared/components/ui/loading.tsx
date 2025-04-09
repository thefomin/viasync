import { LuLoader } from 'react-icons/lu'

import { cn } from '@/shared/utils'

interface LoadingProps {
	className?: string
}
export function Loading({ className }: LoadingProps) {
	return (
		<div
			className={cn(
				'flex items-center justify-center text-sm',
				className
			)}
		>
			<LuLoader className='mr-2 size-5 animate-spin' />
			Загрузка...
		</div>
	)
}
