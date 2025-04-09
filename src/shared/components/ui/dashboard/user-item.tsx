'use client'

import { ChevronDown } from 'lucide-react'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '..'
import { useProfile } from '@/shared/hooks/user'

export function UserItem() {
	const { user } = useProfile()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div
					role='button'
					className='hover:bg-primary/[.04] group mx-2 my-1.5 flex min-h-[32px] cursor-pointer items-center gap-2 rounded-md px-2 py-1 pr-0.5 text-sm font-medium'
				>
					<span className='relative flex shrink-0 flex-row items-center gap-2 overflow-hidden'>
						<Avatar className='h-5 w-5 rounded-sm'>
							{user?.picture ? (
								<AvatarImage
									src={user.picture}
									alt={user.displayName}
								/>
							) : (
								<AvatarFallback className='capitalist rounded-none bg-foreground uppercase text-background'>
									{user?.displayName.slice(0, 1)}
								</AvatarFallback>
							)}
						</Avatar>
					</span>
					<div className='flex w-full flex-1 flex-row items-center gap-2 text-left text-sm leading-tight'>
						<span className='max-w-[50%] truncate font-semibold'>
							{user?.displayName}
						</span>
						<ChevronDown className='text-muted-foreground h-3.5 w-3.5 opacity-0 group-hover:opacity-100' />
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-muted-foreground text-xs font-medium leading-none'>
						{user?.email}
					</p>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
