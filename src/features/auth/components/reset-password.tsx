'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input
} from '@/shared/components/ui'

import { useResetPasswordMutation } from '@/shared/hooks/auth'
import {
	ResetPasswordSchema,
	TypeResetPasswordSchema
} from '@/shared/schemes/auth'
import { AuthWrapper } from '.'
import { useTheme } from 'next-themes'

export function ResetPasswordForm() {
	const { theme } = useTheme()
	const [recapatchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})
	const { reset, isLoadingReset } = useResetPasswordMutation()
	const onSumbit = (values: TypeResetPasswordSchema) => {
		if (recapatchaValue) {
			reset({ values, recaptcha: recapatchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}
	return (
		<AuthWrapper
			heading='Сброс пароля'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/sign-in'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSumbit)}
					className='grid gap-4'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Почта</FormLabel> */}
								<FormControl>
									<Input
										placeholder='email@example.com'
										type='email'
										disabled={isLoadingReset}
										{...field}
										className='bg-bg_card text-text__primary h-[36px] rounded-[6px] border-0 text-[14px]'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={
								process.env.GOOGLE_RECAPTCHA_SITE_KEY as string
							}
							theme={theme === 'light' ? 'light' : 'dark'}
							onChange={setRecaptchaValue}
						/>
					</div>
					<Button
						type='submit'
						className='flex h-[36px] items-center justify-center rounded-[6px] bg-[#2383e2] p-[12px] text-white hover:bg-[#0077d4]'
						disabled={isLoadingReset}
					>
						Сбросить пароль
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
