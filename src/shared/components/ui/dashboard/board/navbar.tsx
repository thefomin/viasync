'use client'

import { useGetById } from '@/shared/hooks/document'
import { useSearchParams } from 'next/navigation'

import { Favorite, Menu, Share } from '../document'

export const Navbar = ({ preview = false }: { preview?: boolean }) => {
	const searchParams = useSearchParams()
	const childDocumentId = searchParams.get('v') || ''
	const { document } = useGetById(childDocumentId)
	if (preview)
		return (
			<>
				<nav className='flex h-[44px] w-full items-center gap-x-2 bg-transparent pb-2 pl-3 pr-2.5 pt-1.5'>
					<div className='flex w-full items-center justify-end'>
						<div className='flex items-center gap-x-2'></div>
					</div>
				</nav>
			</>
		)
	if (!document) return null
	return (
		<>
			<nav className='flex h-[44px] w-full items-center gap-x-2 bg-transparent pb-2 pl-3 pr-2.5 pt-1.5'>
				<div className='flex w-full items-center justify-end'>
					<div className='flex items-center gap-x-2'>
						<Share initialData={document} />
						<Favorite initialData={document} />
						<Menu initialData={document} />
					</div>
				</div>
			</nav>
		</>
	)
}
