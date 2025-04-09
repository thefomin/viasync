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

import { useSignupMutation } from '@/shared/hooks/auth'
import { SignupSchema, TypeSignupSchema } from '@/shared/schemes/auth'

import { useTheme } from 'next-themes'
import { AuthWrapper } from '.'

export function SignupForm() {
	const { theme } = useTheme()
	const [recapatchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeSignupSchema>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})
	const { signup, isLoadingSignup } = useSignupMutation()
	const onSumbit = (values: TypeSignupSchema) => {
		if (recapatchaValue) {
			signup({ values, recaptcha: recapatchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}
	return (
		<AuthWrapper
			heading='Создать аккаунт'
			description='Уже есть аккаунт?'
			backButtonLabel='Войти'
			backButtonHref='/auth/sign-in'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSumbit)}
					className='grid gap-4'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='username'
										type='username'
										disabled={isLoadingSignup}
										{...field}
										className='bg-bg_card text-text__primary h-[50px] rounded-[24px] border-0 text-[14px]'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='email@example.com'
										type='email'
										disabled={isLoadingSignup}
										{...field}
										className='bg-bg_card text-text__primary h-[50px] rounded-[24px] border-0 text-[14px]'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Пароль'
										type='password'
										disabled={isLoadingSignup}
										{...field}
										className='bg-bg_card text-text__primary h-[50px] rounded-[24px] border-0 text-[14px]'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Повторите пароль'
										type='password'
										disabled={isLoadingSignup}
										{...field}
										className='bg-bg_card text-text__primary h-[50px] rounded-[24px] border-0 text-[14px]'
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
							onChange={setRecaptchaValue}
							theme={theme === 'light' ? 'light' : 'dark'}
						/>
					</div>
					<Button
						type='submit'
						className='flex h-[50px] items-center justify-center rounded-[24px] p-[12px] text-base'
						disabled={isLoadingSignup}
					>
						Создать аккуант
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
