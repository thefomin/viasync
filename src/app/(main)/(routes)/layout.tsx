'use client'

import { Navigation } from '@/shared/components/ui/dashboard'
import { Sidebar } from '@/shared/components/ui/dashboard/board'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
export default MainLayout
