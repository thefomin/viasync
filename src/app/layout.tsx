import type { Metadata } from 'next'
import '@/shared/styles/globals.css'
import { MainProvider } from '@/shared/providers'

export const metadata: Metadata = {
	title: 'viasync',
	description:
		'Ваш рабочий процесс. Ваш путь. Все ваши проекты, цели и многое другое — в одном инструменте — персонализированном под вас'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className='antialiased'>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
