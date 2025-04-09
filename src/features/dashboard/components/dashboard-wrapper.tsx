'use client'

interface DashboardWrapperProps {
	children?: React.ReactNode
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
	return (
		<div className='relative z-0 flex h-[100vh] w-full flex-1 flex-col items-center justify-start overflow-hidden rounded-none border-none bg-background'>
			<div className='flex max-h-full w-full flex-col overflow-y-auto rounded-xl p-0'>
				<div className='flex max-h-full flex-col overflow-y-hidden rounded-xl'>
					{children}
				</div>
			</div>
		</div>
	)
}
