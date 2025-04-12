'use client'

import { IoShapesOutline } from 'react-icons/io5'
import { AiFillFile } from 'react-icons/ai'
import { BiSolidChalkboard } from 'react-icons/bi'
import Image from 'next/image'
import { IconType } from 'react-icons'
import { useCreateMutation } from '@/shared/hooks/document'
import { useProfile } from '@/shared/hooks/user'

interface TemplateProps {
	title: string
	desc: string
	icon: IconType
	src?: string
	alt?: string
	isBoard?: boolean
}
export function FeaturedTemplates() {
	const { user } = useProfile()
	if (!user) return null
	return (
		<div className='flex flex-col gap-6 text-foreground'>
			<div className='flex flex-col'>
				<div className='relative mx-auto h-12 w-full max-w-full items-center justify-between px-4 md:max-w-4xl md:px-12'>
					<div className='ml-2 flex h-full flex-row items-center gap-2 font-medium text-muted-foreground/60'>
						<IoShapesOutline className='h-3.5 w-3.5' />
						<span className='text-ellipsis whitespace-nowrap text-xs font-semibold'>
							Featured Templates
						</span>
					</div>
				</div>
				<div className='relative mx-auto w-full max-w-full items-center justify-between px-4 md:max-w-4xl md:px-12'>
					<div className='flex flex-row items-center justify-start gap-4'>
						<Template
							title='Document'
							desc='By viasync'
							src='/assets/images/dashboard/doc.png'
							alt='doc'
							icon={AiFillFile}
						/>
						<Template
							title='Board'
							desc='By viasync'
							src='/assets/images/dashboard/board.png'
							alt='board'
							icon={BiSolidChalkboard}
							isBoard={true}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

const Template = ({
	title,
	desc,
	icon: Icon,
	src,
	alt,
	isBoard = false
}: TemplateProps) => {
	const { create, isPending } = useCreateMutation()
	const handleCreate = () => {
		create({
			title: '',
			...(isBoard && { isBoard: true })
		})
	}
	return (
		<button
			className='h-[150px] w-[240px] cursor-pointer justify-stretch overflow-hidden rounded-xl border bg-third transition-all duration-200 hover:border-muted-foreground/10 disabled:opacity-50'
			onClick={handleCreate}
			disabled={isPending}
		>
			<div className='flex items-center justify-start gap-3 px-4 py-3.5'>
				<Icon className='h-7 w-7 text-muted-foreground/60' />
				<div className='flex flex-col items-start gap-[2px]'>
					<div className='text-sm font-medium'>{title}</div>
					<div className='text-xs font-medium text-muted-foreground/60'>
						{desc}
					</div>
				</div>
			</div>
			{src && alt && (
				<div className='relative inset-0 h-full min-h-0 flex-shrink flex-grow'>
					<Image
						src={src}
						alt={alt}
						width={260}
						height={150}
						className='absolute left-6 h-full rounded-md object-cover'
					/>
				</div>
			)}
		</button>
	)
}
