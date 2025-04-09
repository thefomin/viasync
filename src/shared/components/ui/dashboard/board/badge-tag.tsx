'use client'

import { useState, useRef } from 'react'
import { Input, Popover, PopoverContent, PopoverTrigger } from '../..'
import { IDocument, colorStyles } from '@/shared/types/document'
import { useCreateMutation } from '@/shared/hooks/document/tag'

import { TagList } from '.'
import { CgClose } from 'react-icons/cg'

export const BadgeTag = ({ initialData }: { initialData: IDocument }) => {
	const { create, isPending: isPedingCreate } = useCreateMutation(
		initialData.id
	)

	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement | null>(null)
	const triggerRef = useRef<HTMLDivElement | null>(null)

	const handleClick = () => {
		setTimeout(() => inputRef.current?.focus(), 0)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div
					ref={triggerRef}
					className='flex h-[34px] w-full max-w-full cursor-pointer flex-row items-center justify-start gap-1 overflow-hidden text-ellipsis rounded-[4px] px-1.5 text-muted-foreground/80 hover:bg-primary/[.04]'
					onClick={handleClick}
				>
					{isPedingCreate || initialData.selectedTag?.name ? (
						<div
							className={`inline-flex h-5 min-w-0 max-w-48 items-center overflow-hidden text-ellipsis rounded-[3px] px-1.5 text-sm font-medium ${
								colorStyles[
									initialData.selectedTag?.color || 'ORANGE'
								]
							}`}
						>
							{isPedingCreate
								? value
								: initialData.selectedTag?.name}
						</div>
					) : (
						'Пустой'
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent
				side='bottom'
				align='start'
				style={
					{
						'--trigger-width': triggerRef.current
							? `${triggerRef.current.offsetWidth}px`
							: '100%'
					} as React.CSSProperties
				}
				className='absolute -top-[42px] z-[99999] min-w-[var(--trigger-width)] rounded-lg border border-muted-foreground/10 bg-third p-0'
				onClick={e => e.stopPropagation()}
			>
				<div className='border-b border-muted-foreground/20'>
					<div className='flex flex-row items-center gap-1 px-2.5'>
						{isPedingCreate || initialData.selectedTag?.name ? (
							<div
								className={`inline-flex h-5 w-full min-w-0 max-w-max items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[3px] px-1.5 text-sm font-medium ${
									colorStyles[
										initialData.selectedTag?.color ||
											'ORANGE'
									]
								}`}
							>
								<div className='items-center overflow-hidden text-ellipsis whitespace-nowrap'>
									<span className='overflow-hidden text-ellipsis whitespace-nowrap'>
										{isPedingCreate
											? value
											: initialData.selectedTag?.name}
									</span>
								</div>
								<div
									role='button'
									className='ml-0.5 flex h-3 items-center'
								>
									<CgClose className='h-3 w-3 text-muted-foreground/80' />
								</div>
							</div>
						) : null}
						<Input
							ref={inputRef}
							type='text'
							value={value}
							onChange={e => setValue(e.target.value)}
							className='w-full bg-transparent outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-transparent'
						/>
					</div>
				</div>
				<div className='flex max-h-96 flex-col overflow-hidden overflow-y-auto rounded-bl-xl rounded-br-xl bg-secondary p-1'>
					<div className='relative z-10 flex w-full px-1.5 py-2 text-xs font-medium text-muted-foreground/70'>
						Выберите вариант или создайте новый
					</div>
					<TagList
						initialData={initialData}
						create={create}
						value={value}
						setValue={setValue}
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}
