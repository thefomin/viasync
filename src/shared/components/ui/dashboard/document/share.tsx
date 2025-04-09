import { Publish } from '.'
import { Popover, PopoverTrigger, PopoverContent, Button } from '../..'

import { IDocument } from '@/shared/types/document'

interface ShareProps {
	initialData: IDocument
}

export const Share = ({ initialData }: ShareProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='ghost'
					aria-label='share'
					className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04]'
				>
					Share
				</Button>
			</PopoverTrigger>
			<PopoverContent className='z-[99999] w-80 rounded-xl border border-muted-foreground/20 bg-third p-0'>
				<div className='relative z-10 flex w-full border-b border-muted-foreground/30 px-2'>
					<div className='relative min-w-0 flex-shrink-0 whitespace-nowrap pb-1.5 pt-1.5'>
						<Button
							variant='ghost'
							className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04] disabled:pointer-events-auto disabled:cursor-not-allowed'
							disabled
						>
							Share
						</Button>
					</div>
					<div className='relative min-w-0 flex-shrink-0 whitespace-nowrap pb-1.5 pt-1.5'>
						<Button
							variant='ghost'
							className='h-[28px] rounded-lg px-2 hover:bg-primary/[.04]'
						>
							Publish
							{initialData.isPublished ? (
								<>
									<span className='relative flex h-2 w-2'>
										<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75'></span>

										<span className='relative inline-flex h-2 w-2 rounded-full bg-blue-500'></span>
									</span>
								</>
							) : (
								<></>
							)}
						</Button>
						<div className='absolute -bottom-[0.8px] left-2 right-2 border border-foreground'></div>
					</div>
				</div>
				<Publish initialData={initialData} />
			</PopoverContent>
		</Popover>
	)
}
