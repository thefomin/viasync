'use client'

import { useRouter } from 'next/navigation'
import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
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
			<div className='flex w-full flex-col gap-2'>
				<Button
					onClick={() => onClick('google')}
					variant='outline'
					className='relative flex h-[36px] w-full items-center justify-center rounded-[6px] p-[12px] [&_svg]:size-5'
				>
					<FcGoogle className='absolute left-2.5 mr-2 size-5 h-6 w-6' />
					Продолжить с Google
				</Button>
				<Button
					onClick={() => onClick('yandex')}
					variant='outline'
					className='relative flex h-[36px] w-full items-center justify-center rounded-[6px] p-[12px] [&_svg]:size-4'
				>
					<FaYandex className='absolute left-2.5 mr-2 size-5 h-4 w-4 text-rose-600' />
					Продолжить с Яндекс
				</Button>
			</div>
			<div className='relative mb-8'>
				<div className='absolute inset-0 top-[15px] flex items-center'>
					<span className='w-full border-t' />
				</div>
			</div>
		</>
	)
}
