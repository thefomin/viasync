'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/shared/components/ui'

interface CarouselProps {
	children: React.ReactNode
}

export function Carousel({ children }: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		skipSnaps: false,
		dragFree: true
	})

	const [showLeftMask, setShowLeftMask] = React.useState(false)
	const [showRightMask, setShowRightMask] = React.useState(true)

	const scrollPrev = React.useCallback(
		() => emblaApi?.scrollPrev(),
		[emblaApi]
	)
	const scrollNext = React.useCallback(
		() => emblaApi?.scrollNext(),
		[emblaApi]
	)

	const onScroll = React.useCallback(() => {
		if (!emblaApi) return

		const scrollProgress = emblaApi.scrollProgress()

		setShowLeftMask(scrollProgress > 0.001)
		setShowRightMask(scrollProgress < 0.999)
	}, [emblaApi])

	React.useEffect(() => {
		if (!emblaApi) return

		onScroll()
		emblaApi.on('scroll', onScroll)
		emblaApi.on('reInit', onScroll)

		return () => {
			emblaApi.off('scroll', onScroll)
			emblaApi.off('reInit', onScroll)
		}
	}, [emblaApi, onScroll])

	const maskImage = React.useMemo(() => {
		if (showLeftMask && showRightMask) {
			return 'linear-gradient(to right, transparent 0%, black 96px, black calc(100% - 96px), transparent 100%)'
		} else if (showLeftMask) {
			return 'linear-gradient(to right, transparent 0%, black 96px)'
		} else if (showRightMask) {
			return 'linear-gradient(to left, transparent 0%, black 96px)'
		}
		return 'none'
	}, [showLeftMask, showRightMask])

	return (
		<div className='group relative mx-auto w-full max-w-full px-0 md:max-w-4xl md:px-12'>
			<div
				className='overflow-hidden px-4 md:px-0'
				ref={emblaRef}
				data-mask={showLeftMask || showRightMask ? 'true' : 'false'}
				style={{
					maskImage,
					WebkitMaskImage: maskImage
				}}
			>
				<div className='-ml-4 flex gap-4 pl-4'>{children}</div>
			</div>
			{showLeftMask && (
				<Button
					variant='outline'
					size='icon'
					className='absolute left-7 top-1/2 h-8 w-8 rounded-full opacity-0 duration-300 md:-translate-y-1/2 md:transition-opacity md:group-hover:opacity-100'
					disabled={!showLeftMask}
					onClick={scrollPrev}
				>
					<ChevronLeft className='h-4 w-4' />
					<span className='sr-only'>Previous</span>
				</Button>
			)}
			{showRightMask && (
				<Button
					variant='outline'
					size='icon'
					className='absolute right-7 top-1/2 h-8 w-8 rounded-full opacity-0 duration-300 md:-translate-y-1/2 md:transition-opacity md:group-hover:opacity-100'
					disabled={!showRightMask}
					onClick={scrollNext}
				>
					<ChevronRight className='h-4 w-4' />
					<span className='sr-only'>Next</span>
				</Button>
			)}
		</div>
	)
}
