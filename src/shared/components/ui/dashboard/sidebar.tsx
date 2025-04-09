import { cn } from '@/shared/utils'

import { useSidebar } from '@/shared/providers'

export function Sidebar({ children }: { children: React.ReactNode }) {
	const {
		sidebarRef,
		isResetting,

		resetWidth,

		handleMouseDown
	} = useSidebar()

	return (
		<aside
			ref={sidebarRef}
			className={cn(
				'group/sidebar relative z-[9999] flex size-full h-full w-60 flex-col overflow-y-auto border-r bg-secondary transition-all duration-200 ease-in-out',
				isResetting && 'transition-all duration-200 ease-in-out'
			)}
			style={{ width: '250px' }}
		>
			{children}
			<div
				onMouseDown={handleMouseDown}
				onClick={resetWidth}
				className='absolute -right-[0.050rem] top-0 h-full w-0.5 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100'
			></div>
		</aside>
	)
}
