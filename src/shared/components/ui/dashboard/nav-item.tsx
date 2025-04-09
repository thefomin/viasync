'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/shared/utils'
import { LucideIcon } from 'lucide-react'
import { type IconType } from 'react-icons'

interface NavProps {
	title?: string
	icon: LucideIcon | IconType
	href: string
}
export function NavItem({ title, icon: Icon, href }: NavProps) {
	const pathname = usePathname()
	const router = useRouter()

	const onRedirect = () => {
		router.push(href)
	}
	const isActive = pathname === href
	return (
		<>
			<div
				role='button'
				onClick={onRedirect}
				className={cn(
					'text-subtle-foreground relative z-[9999] flex h-8 min-h-[32px] w-full cursor-pointer items-center justify-start gap-2 rounded-md px-1 py-1 pr-0.5 text-sm font-medium transition-all hover:bg-primary/[.04]',
					isActive && 'bg-primary/5 text-primary'
				)}
			>
				<div className='focus-ring transition-bg-ease inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0'>
					<Icon className='h-6 w-6 shrink-0 text-muted-foreground' />
				</div>

				<span className='max-w-[60%] truncate text-sm'>{title}</span>
			</div>
		</>
	)
}
