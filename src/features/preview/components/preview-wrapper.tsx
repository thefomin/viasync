'use client'

interface PreviewWrapperProps {
	children: React.ReactNode
}

export function PreviewWrapper({ children }: PreviewWrapperProps) {
	return (
		<>
			<div className='relative h-dvh overflow-y-scroll'>{children}</div>
		</>
	)
}
