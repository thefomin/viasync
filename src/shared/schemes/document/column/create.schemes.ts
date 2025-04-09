import { z } from 'zod'

export const CreateSchema = z.object({
	parentDocumentId: z.string(),
	userId: z.string(),
	name: z.optional(z.string()),
	color: z.optional(z.string()),
	position: z.optional(z.string())
})

export type TypeCreateSchema = z.infer<typeof CreateSchema>
