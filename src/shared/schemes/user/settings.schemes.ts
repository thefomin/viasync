import { z } from 'zod'

export const SettingsSchema = z.object({
	name: z.optional(
		z.string().min(1, {
			message: 'Введите имя'
		})
	),
	email: z.optional(
		z.string().email({
			message: 'Некорректная почта'
		})
	),
	isTwoFactorEnabled: z.optional(z.boolean())
})

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>
