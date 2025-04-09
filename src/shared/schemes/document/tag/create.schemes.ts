import { z } from 'zod'

export const CreateSchema = z.object({
	name: z.optional(z.string()),
	color: z.optional(z.string())
})

export type TypeCreateSchema = z.infer<typeof CreateSchema>
