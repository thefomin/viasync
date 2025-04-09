'use client'
import { Check } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../..'
import { cn } from '@/shared/utils'
import { colorStyles, EnumColor, IColumn } from '@/shared/types/document'

interface StatusColorProps {
	children: React.ReactNode
	column: IColumn
	onClick: (color: EnumColor) => void
}

export const StatusColor = ({
	children,
	column,
	onClick
}: StatusColorProps) => {
	const selectedColor = (column.color || 'DEFAULT') as EnumColor

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				className='z-[999999999] w-56 rounded-lg border border-muted-foreground/10 bg-third p-0'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex max-h-[408px] flex-col overflow-hidden overflow-y-auto p-1'>
					<div className='mt-[9px] flex flex-col text-sm font-medium'>
						<div
							role='button'
							className='relative z-10 flex h-[30px] w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-[6px] px-2 text-[12px] text-muted-foreground/60'
						>
							Colors
						</div>
						{(
							Object.entries(colorStyles) as [EnumColor, string][]
						).map(([colorKey, colorClass]) => (
							<div
								key={colorKey}
								role='button'
								className='relative z-10 flex h-[30px] w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-[6px] px-2 text-sm capitalize hover:bg-primary/[.04]'
								onClick={() => onClick(colorKey)}
							>
								<div className='flex flex-row gap-2'>
									<div
										className={cn(
											'inline-flex h-5 w-5 items-center justify-center rounded-[3px]',
											colorClass
										)}
									></div>
									<span className='capitalize'>
										{colorKey.charAt(0).toUpperCase() +
											colorKey.slice(1).toLowerCase()}
									</span>
								</div>
								<div>
									{colorKey === selectedColor && (
										<Check size={16} />
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
