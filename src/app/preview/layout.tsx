'use client'

import { Navigation, Sidebar } from '@/features/preview/components'

const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex h-screen min-h-full bg-background'>
			<Navigation />
			<main className='h-full flex-1 overflow-y-auto'>
				{/* <SearchCommand /> */}
				{children}
			</main>
			<Sidebar />
		</div>
	)
}
export default PreviewLayout
