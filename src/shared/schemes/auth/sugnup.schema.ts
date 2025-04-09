import { z } from 'zod'

export const SignupSchema = z
	.object({
		name: z.string().min(1, {
			message: 'Введите имя'
		}),
		email: z.string().email({
			message: 'Некорректная почта'
		}),
		password: z.string().min(6, {
			message: 'Пароль минимум 6 символов'
		}),
		passwordRepeat: z.string().min(6, {
			message: 'Пароль подтверждения минимум 6 символов'
		})
	})
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat']
	})

export type TypeSignupSchema = z.infer<typeof SignupSchema>
