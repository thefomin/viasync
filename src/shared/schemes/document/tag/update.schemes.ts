import { EnumColor } from '@/shared/types/document'
import { z } from 'zod'

export const UpdateSchema = z.object({
	tagId: z.optional(z.string())
})

export type TypeUpdateSchema = z.infer<typeof UpdateSchema>

export const UpdateSelectedTagSchema = z.object({
	name: z.optional(z.string()),
	color: z.optional(z.enum(Object.values(EnumColor) as [string, ...string[]]))
})

export type TypeUpdateSelectedTagSchema = z.infer<
	typeof UpdateSelectedTagSchema
>
