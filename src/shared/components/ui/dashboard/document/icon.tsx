'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useTheme } from 'next-themes'

import { Button, Popover, PopoverContent, PopoverTrigger } from '../..'

interface IconPickerProps {
	onChange: (icon: string) => void
	onClick: () => void
	children: React.ReactNode
}

export function IconPicker({ onChange, children, onClick }: IconPickerProps) {
	const { theme } = useTheme()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div onClick={e => e.stopPropagation()}>{children}</div>
			</PopoverTrigger>
			<PopoverContent
				className='z-[99999] w-full rounded-xl border bg-third p-0'
				onClick={e => e.stopPropagation()}
			>
				<div className='relative z-10 flex w-full justify-end border-b border-muted-foreground/30 px-2'>
					<div className='relative min-w-0 flex-shrink-0 whitespace-nowrap pb-1.5 pt-1.5'>
						<Button
							variant='ghost'
							className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04]'
						>
							Emoji
						</Button>
						<div className='absolute -bottom-[0.8px] left-2 right-2 border border-foreground'></div>
					</div>
					<div className='flex flex-grow items-center justify-end py-2'>
						<Button
							variant='ghost'
							className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04]'
							onClick={onClick}
						>
							Удалить
						</Button>
					</div>
				</div>
				<div className='custom-emoji-picker h-[435px] w-[352px] border-none p-0.5 shadow-none'>
					<Picker
						data={data}
						onEmojiSelect={onChange}
						locale='ru'
						theme={theme}
						skinTonePosition='none'
						skin='1'
						navPosition='bottom'
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}
