import { AuthSocial } from '@/features/auth/components'
import Link from 'next/link'
import { type PropsWithChildren } from 'react'

interface AuthWrapperProps {
	heading?: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	isShowSocial?: boolean
	isShowResetPassword?: boolean
}

export function AuthWrapper({
	children,
	heading,
	description,
	backButtonHref,
	backButtonLabel,
	isShowSocial = false,
	isShowResetPassword = false
}: PropsWithChildren<AuthWrapperProps>) {
	return (
		<div className='flex h-screen w-full justify-center'>
			<div className='flex w-full flex-col items-center justify-center'>
				<div className='w-[400px] rounded-[12px] border-0 p-[12px]'>
					<div className='flex w-full flex-col justify-center p-4'>
						<h1 className='flex justify-start text-xl font-semibold'>
							Подумай. Сделай.
						</h1>
						<h2 className='flex justify-start text-xl font-semibold text-muted-foreground'>
							{heading}
						</h2>
					</div>
					<div className='flex flex-col gap-2 p-3'>
						{isShowSocial && <AuthSocial />}
						{children}
						<div className='relative mb-4'>
							<div className='absolute inset-0 top-[15px] flex items-center'>
								<span className='w-full border-t' />
							</div>
						</div>
						<div className='flex w-full flex-row justify-center gap-4 text-sm'>
							<Link
								href={`${backButtonHref}`}
								className='flex h-[40px] w-full items-center justify-center rounded-[24px] p-[12px] text-sm'
							>
								{description} {backButtonLabel}
							</Link>
							{isShowResetPassword && (
								<Link
									href='/auth/reset-password'
									className='flex h-[40px] w-full items-center justify-center rounded-[24px] p-[12px] text-sm'
								>
									Забыли пароль?
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
