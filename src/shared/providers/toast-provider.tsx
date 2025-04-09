'use client'

import { Toaster } from '../components/ui'

export function ToastProvider() {
	return <Toaster position='bottom-center' duration={6000} />
}
