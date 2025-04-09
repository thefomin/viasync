import { type Metadata } from 'next'
import { Suspense } from 'react'

import { NewPasswordForm } from '@/features/auth/components'

import { Loading } from '@/shared/components/ui'

export const metadata: Metadata = {
	title: 'Новый пароль'
}

export default async function NewPasswordPage(props: {
	searchParams?: Promise<{
		token?: string
	}>
}) {
	const searchParams = await props.searchParams
	const token = searchParams?.token || ''

	return (
		<Suspense key={token} fallback={<Loading />}>
			<NewPasswordForm token={token} />
		</Suspense>
	)
}
