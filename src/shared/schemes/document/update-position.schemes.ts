import { z } from 'zod'

export const UpdatePositionSchema = z.object({
	ids: z.array(z.string()),
	documentId: z.optional(z.string())
})

export type TypeUpdatePositionSchema = z.infer<typeof UpdatePositionSchema>
