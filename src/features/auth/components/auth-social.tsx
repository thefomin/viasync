'use client'

import { useRouter } from 'next/navigation'
import { FaGoogle, FaYandex } from 'react-icons/fa'

import { Button } from '@/shared/components/ui'

import { useOAuthByProviderMutation } from '@/shared/hooks/auth'

export function AuthSocial() {
	const router = useRouter()
	const { mutateAsync } = useOAuthByProviderMutation()

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)

		if (response) {
			router.push(response.url)
		}
	}
	return (
		<>
			<div className='flex w-full flex-row gap-4'>
				<Button
					onClick={() => onClick('google')}
					variant='outline'
					className='flex h-[50px] w-full items-center justify-center rounded-[24px] p-[12px]'
				>
					<FaGoogle className='mr-2 size-4' />
					Google
				</Button>
				<Button
					onClick={() => onClick('yandex')}
					variant='outline'
					className='flex h-[50px] w-full items-center justify-center rounded-[24px] p-[12px]'
				>
					<FaYandex className='mr-2 size-4' />
					Яндекс
				</Button>
			</div>
			<div className='relative mb-2 space-y-4'>
				<div className='absolute inset-0 top-[15px] flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-card text-muted-foreground px-2'>
						Или
					</span>
				</div>
			</div>
		</>
	)
}
