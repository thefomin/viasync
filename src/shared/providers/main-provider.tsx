'use client'

import {
	DocumentProvider,
	SidebarProvider,
	TanstackProvider,
	ThemeProvider,
	ToastProvider
} from '.'
import { type PropsWithChildren } from 'react'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='dark'
				disableTransitionOnChange
			>
				<ToastProvider />
				<SidebarProvider>
					<DocumentProvider>{children}</DocumentProvider>
				</SidebarProvider>
			</ThemeProvider>
		</TanstackProvider>
	)
}
