import { z } from 'zod'

export const CreateSchema = z.object({
	parentDocumentId: z.optional(z.string()),
	columnId: z.optional(z.string()),
	title: z.optional(z.string()),
	description: z.optional(z.string()),
	isBoard: z.optional(z.boolean())
})

export type TypeCreateSchema = z.infer<typeof CreateSchema>
