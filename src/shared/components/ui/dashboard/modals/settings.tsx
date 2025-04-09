'use client'

import { cn } from '@/shared/utils'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../..'
import { NavSettings, Preferences, Profile } from '..'
import { useState } from 'react'
import { TbSettings } from 'react-icons/tb'

export const tabs = {
	preferences: 'preferences settings',
	profile: 'profile settings'
}

export const Settings = () => {
	const [activeTab, setActiveTab] = useState<keyof typeof tabs>('profile')
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					className={cn(
						'text-subtle-foreground group relative z-[9999] flex h-8 min-h-[32px] w-full cursor-pointer items-center justify-start gap-2 rounded-md px-1 py-1 pr-0.5 text-sm font-medium transition-all hover:bg-primary/[.04]'
					)}
				>
					<div className='focus-ring transition-bg-ease inline-flex size-[24px] cursor-pointer select-none items-center justify-center gap-2 truncate whitespace-nowrap rounded-sm text-sm text-muted-foreground opacity-100 ring-offset-background transition hover:bg-primary/[.04] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0'>
						<TbSettings className='h-6 w-6' />
					</div>
					Settings
				</Button>
			</DialogTrigger>
			<DialogContent className='z-[9999999] h-[calc(-100px+100vh)] max-h-[715px] w-[1150px] max-w-[calc(-100px+100vw)] rounded-xl border border-muted-foreground/20 bg-background p-0'>
				<DialogHeader className='sr-only'>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						{
							"Make changes to your profile here. Click save when you're done."
						}
					</DialogDescription>
				</DialogHeader>
				<div className='flex h-full flex-row'>
					<NavSettings
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
					<div className='relative h-full flex-grow'>
						{activeTab === 'profile' && <Profile />}
						{activeTab === 'preferences' && <Preferences />}
					</div>
				</div>

				<DialogFooter className='sr-only'></DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
