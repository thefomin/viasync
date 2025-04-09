import { Metadata } from 'next'

import { SigninForm } from '@/features/auth/components'

export const metadata: Metadata = {
	title: 'Войти в аккаунт'
}

export default function SigninPage() {
	return <SigninForm />
}
