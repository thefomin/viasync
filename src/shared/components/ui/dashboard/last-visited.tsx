import Link from 'next/link'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Carousel
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks/user'
import { cn } from '@/shared/utils'
import { IDocument } from '@/shared/types/document'
import Image from 'next/image'

export default function LastVisitedCarousel({
	initialData
}: {
	initialData: IDocument[]
}) {
	const { user } = useProfile()
	if (!user) return null

	return (
		<div className={cn('flex flex-row justify-center')}>
			<Carousel>
				{initialData.map(doc => {
					return (
						<div key={doc.id} className='min-w-[144px] p-0'>
							<Link href={doc.id}>
								<div
									className={cn(
										'h-[144px] w-[144px] cursor-pointer justify-stretch overflow-hidden rounded-xl border bg-third transition-all duration-200 hover:border-muted-foreground/10'
									)}
								>
									<div className='relative mb-4'>
										<div className='h-[44px] w-[144px] border-[unset] bg-muted-foreground/5'>
											<div className='pointer-events-none relative h-[44px] overflow-hidden'>
												{doc.cover && (
													<Image
														src={doc.cover}
														alt={`color-${doc.id}`}
														fill
														className='block h-[44px] w-full rounded-[1px_1px_0px_0px] object-cover object-center'
														sizes='100vw'
														priority
													/>
												)}
											</div>
										</div>
										<div className='absolute -bottom-3.5 left-4 flex items-center justify-start text-3xl'>
											<span
												role='img'
												aria-label={doc.icon}
											>
												{doc.icon}
											</span>
										</div>
									</div>

									<div className='relative flex min-h-[79px] w-full flex-grow flex-col justify-between gap-2.5 px-4 pb-3 pt-2.5'>
										<div className='flex h-auto max-w-[300px] flex-col gap-1'>
											<h3 className='relative line-clamp-2 max-w-[287px] overflow-hidden truncate text-ellipsis whitespace-nowrap break-words text-sm font-medium text-foreground'>
												{doc.title}
											</h3>
										</div>
										<div className='flex items-center justify-start gap-2'>
											<Avatar className='h-4 w-4'>
												<AvatarImage
													src={user.picture}
													alt={user.displayName}
												/>
												<AvatarFallback className='bg-foreground text-[10px] text-background'>
													{user.displayName.slice(
														0,
														1
													)}
												</AvatarFallback>
											</Avatar>
											<div className='inline-flex h-4 items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
												{/* {documentDates} */}
											</div>
										</div>
									</div>
								</div>
							</Link>
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}
