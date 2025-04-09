import { z } from 'zod'

export const UpdateSchema = z.object({
	title: z.optional(z.string()),
	description: z.optional(z.string()),
	content: z.optional(z.string()),
	cover: z.optional(z.string()),
	icon: z.optional(z.string()),
	isPublished: z.optional(z.boolean()),
	isFavorited: z.optional(z.boolean()),
	isArchived: z.optional(z.boolean()),
	updatedAt: z.optional(z.string())
})

export type TypeUpdateSchema = z.infer<typeof UpdateSchema>
