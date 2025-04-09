import { Metadata } from 'next'

import { SignupForm } from '@/features/auth/components'

export const metadata: Metadata = {
	title: 'Создать аккаунт'
}

export default function SignupPage() {
	return <SignupForm />
}
