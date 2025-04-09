import { z } from 'zod'

export const UpdateSchema = z.object({
	parentDocumentId: z.string(),
	name: z.optional(z.string()),
	color: z.optional(z.string())
})

export type TypeUpdateSchema = z.infer<typeof UpdateSchema>

export const UpdateOrderSchema = z.object({
	ids: z.array(z.string()),
	documentId: z.optional(z.string())
})

export type TypeUpdateOrderSchema = z.infer<typeof UpdateOrderSchema>
