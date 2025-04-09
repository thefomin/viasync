import { LucideIcon } from 'lucide-react'
import { Button } from '..'
import { IconType } from 'react-icons/lib'
import { cn } from '@/shared/utils'

interface MenuItemProps {
	label: string
	onClick?: () => void
	icon: LucideIcon | IconType
	disabled?: boolean
	className?: string
}
export const MenuItem = ({
	disabled,
	onClick,
	icon: Icon,
	label,
	className
}: MenuItemProps) => {
	return (
		<Button
			variant='ghost'
			aria-label='menu-item'
			className={cn(
				'h-[30px] w-full justify-start rounded-md px-2 hover:bg-primary/[.04]',
				className
			)}
			disabled={disabled}
			onClick={onClick}
		>
			<Icon />
			{label}
		</Button>
	)
}
