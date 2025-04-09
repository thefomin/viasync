import { BadgeTag } from '.'

import { IDocument } from '@/shared/types/document'
import { FaRegCirclePlay } from 'react-icons/fa6'

interface DocumentOptionsProps {
	initialData: IDocument
}

export const DocumentOptions = ({ initialData }: DocumentOptionsProps) => {
	return (
		<>
			<div className='mx-auto w-full max-w-full pl-16 pt-2'>
				<div
					className='relative mb-1 flex w-full items-center'
					style={{
						paddingRight: `calc(64px + env(safe-area-inset-left))`
					}}
				>
					<div className='flex h-[34px] w-48 cursor-pointer flex-row items-center justify-start gap-1.5 rounded-[4px] px-2 text-sm font-medium text-muted-foreground/80 hover:bg-primary/[.04]'>
						<FaRegCirclePlay className='h-3.5 w-3.5 rotate-90' />
						Priority Level
					</div>
					<BadgeTag initialData={initialData} />
				</div>
			</div>
		</>
	)
}
