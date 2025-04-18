'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
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

import { useSigninMutation } from '@/shared/hooks/auth'
import { SigninSchema, TypeSigninSchema } from '@/shared/schemes/auth'
import { AuthWrapper } from '.'

export function SigninForm() {
	const { theme } = useTheme()
	const [recapatchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeSigninSchema>({
		resolver: zodResolver(SigninSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})
	const [isShowTwoFactor, setIsShowFactor] = useState(false)
	const { signin, isLoadingSignin } = useSigninMutation(setIsShowFactor)
	const onSumbit = (values: TypeSigninSchema) => {
		if (recapatchaValue) {
			signin({ values, recaptcha: recapatchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}
	return (
		<AuthWrapper
			heading='Войти в viasync'
			backButtonLabel='Создать аккаунт'
			backButtonHref='/auth/sign-up'
			isShowSocial
			isShowResetPassword
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSumbit)}
					className='grid gap-4'
				>
					{isShowTwoFactor && (
						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem className='bg-background'>
									{/* <FormLabel>Почта</FormLabel> */}
									<FormControl>
										<Input
											placeholder='Код'
											disabled={isLoadingSignin}
											{...field}
											className='bg-bg_card text-text__primary h-[36px] rounded-[6px] border-0 text-[14px]'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!isShowTwoFactor && (
						<>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										{/* <FormLabel>Почта</FormLabel> */}
										<FormControl>
											<Input
												placeholder='Введите почту'
												type='email'
												disabled={isLoadingSignin}
												{...field}
												className='bg-bg_card text-text__primary h-[36px] rounded-[6px] border-0 text-[14px]'
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
											{/* <Label htmlFor='email'>
												Your email address
											</Label> */}
											<Input
												placeholder='Введите пароль'
												type='password'
												disabled={isLoadingSignin}
												{...field}
												className='bg-bg_card text-text__primary h-[36px] rounded-[6px] border-0 text-[14px]'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={
								process.env.GOOGLE_RECAPTCHA_SITE_KEY as string
							}
							onChange={setRecaptchaValue}
							theme={theme === 'light' ? 'light' : 'dark'}
							size='normal'
							className='overflow-hidden border-none'
							style={{ border: 'none', outline: 'none' }}
							isolated={true}
						/>
					</div>
					<Button
						type='submit'
						className='flex h-[36px] items-center justify-center rounded-[6px] bg-[#2383e2] p-[12px] text-white hover:bg-[#0077d4]'
						disabled={isLoadingSignin}
					>
						Войти в аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
