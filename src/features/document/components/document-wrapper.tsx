'use client'

interface DocumentWrapperProps {
	children: React.ReactNode
}

export function DocumentWrapper({ children }: DocumentWrapperProps) {
	return (
		<>
			<div className='relative h-dvh overflow-y-scroll'>{children}</div>
		</>
	)
}
