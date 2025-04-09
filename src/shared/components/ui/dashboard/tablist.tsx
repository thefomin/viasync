import { BsLayoutThreeColumns } from 'react-icons/bs'
import { Button } from '..'
import { useDocument } from '@/shared/providers'
import { cn } from '@/shared/utils'

export const TabList = () => {
	const { navbarRef } = useDocument()
	return (
		<>
			<div
				ref={navbarRef}
				className={cn('sticky left-0 top-0 z-10 flex pl-24 pr-24')}
			>
				<div className='left-24 mb-[1px] flex h-10 w-full items-center border-b border-muted-foreground/20'>
					<div className='flex h-full flex-grow items-center overflow-hidden'>
						<div className='relative min-w-0 flex-shrink-0 whitespace-nowrap pb-1.5 pt-1.5'>
							<Button
								variant='ghost'
								className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04] [&_svg]:size-3'
							>
								<BsLayoutThreeColumns size={30} />
								Board view
							</Button>
							<div className='absolute -bottom-[0.8px] left-0 right-0 border border-foreground'></div>
						</div>
					</div>
					{/* <div className='flex items-center'>
						<Button
							onClick={resetWidth}
							variant='ghost'
							className='h-[28px] rounded-lg bg-[#2383e2] px-2 font-medium text-white hover:bg-[#0077d4] hover:text-white [&_svg]:size-3'
						>
							New
						</Button>
					</div> */}
				</div>
			</div>
		</>
	)
}
