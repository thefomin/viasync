'use client'

import { AuthWrapper } from '.'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Loading } from '@/shared/components/ui'

import { useVerificationMutation } from '@/shared/hooks/auth'

export function NewVerificationForm() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		if (token) {
			verification(token)
		}
	}, [token, verification])
	return (
		<AuthWrapper heading='Подтверждение почты'>
			<div>
				<Loading />
			</div>
		</AuthWrapper>
	)
}
