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

import { useNewPasswordMutation } from '@/shared/hooks/auth'
import { NewPasswordSchema, TypeNewPasswordSchema } from '@/shared/schemes/auth'

import { AuthWrapper } from '.'

export function NewPasswordForm({ token }: { token: string }) {
	const [recapatchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ''
		}
	})
	const { newPassword, isLoadingNew } = useNewPasswordMutation(token)
	const onSumbit = (values: TypeNewPasswordSchema) => {
		if (recapatchaValue) {
			newPassword({ values, recaptcha: recapatchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}
	return (
		<AuthWrapper
			heading='Новый пароль'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/signin'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSumbit)}
					className='grid gap-4'
				>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								{/* <FormLabel>Почта</FormLabel> */}
								<FormControl>
									<Input
										placeholder='Пароль'
										type='password'
										disabled={isLoadingNew}
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
						/>
					</div>
					<Button
						type='submit'
						className='flex h-[50px] items-center justify-center rounded-[24px] p-[12px] text-base'
						disabled={isLoadingNew}
					>
						Продолжить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
