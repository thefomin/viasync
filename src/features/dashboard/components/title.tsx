import { Button, Skeleton } from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks/user'

export const Title = () => {
	const { user } = useProfile()
	if (!user)
		return (
			<>
				<div className='mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-10 text-2xl font-bold text-foreground md:mt-12 md:flex-row md:px-0 md:text-3xl'>
					<span className='flex-shrink-0'>Добро пожаловать,</span>

					<Title.Skeleton />
				</div>
			</>
		)
	return (
		<div className='mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-center px-10 text-2xl font-bold text-foreground md:mt-12 md:flex-row md:px-0 md:text-3xl'>
			<span className='flex-shrink-0'>Добро пожаловать,</span>

			<Button
				variant='ghost'
				className='min-w-0 max-w-[50%] px-2 py-2 text-2xl font-bold hover:bg-sidebar md:text-3xl'
			>
				<span className='block overflow-hidden text-ellipsis whitespace-nowrap'>
					{user?.displayName}
				</span>
			</Button>
		</div>
	)
}

Title.Skeleton = function TitleSkeleton() {
	return (
		<Skeleton className='ml-2 h-8 w-24 rounded-md px-2 py-2 text-2xl font-bold md:text-3xl' />
	)
}
