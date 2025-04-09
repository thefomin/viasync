import { IUser } from '../user'

export interface IDocument {
	id: string
	documentId: string
	title?: string
	description?: string
	content?: string
	icon?: string
	cover?: string
	isPublished?: boolean
	isFavorited?: boolean
	isArchived?: boolean
	isBoard?: boolean
	parentDocumentId: string
	columnId: string
	ownerId: string
	members?: IUser[]
	columns: IColumn[]
	tags: ITags[]
	children: IDocument[]
	createdAt: string
	updatedAt: string
	lastVisited?: string
	position: number
	viewType: string
	selectedTagId: string
	selectedTag: ITag
}

export interface IColumn {
	id: string
	userId: string
	parentDocumentId: string
	createdAt: string
	updatedAt: string
	name?: string
	color?: string
	position?: string
	protected: string
	documents: IDocument[]
}

export interface ITags {
	id: string
	documentId: string
	tagId: string
	tag: ITag
}

export interface ITag {
	id?: string
	name?: string
	color?: EnumColor
	userId?: string
}

export const EnumColor = {
	DEFAULT: 'DEFAULT',
	GRAY: 'GRAY',
	BROWN: 'BROWN',
	ORANGE: 'ORANGE',
	YELLOW: 'YELLOW',
	GREEN: 'GREEN',
	BLUE: 'BLUE',
	PURPLE: 'PURPLE',
	PINK: 'PINK',
	RED: 'RED'
} as const

export type EnumColor = (typeof EnumColor)[keyof typeof EnumColor]

export const colorStyles: Record<EnumColor, string> = {
	DEFAULT: 'bg-muted-foreground/20 text-foreground',
	GRAY: 'bg-muted-foreground/30 text-foreground',
	BROWN: 'bg-amber-700/40 text-white/80',
	ORANGE: 'bg-amber-600/40 text-white/80',
	YELLOW: 'bg-amber-500/50 text-white/80',
	GREEN: 'bg-emerald-600/50 text-white/80',
	BLUE: 'bg-sky-500/30 text-white/80',
	PURPLE: 'bg-purple-500/30 text-white/80',
	PINK: 'bg-pink-500/30 text-white/80',
	RED: 'bg-red-500/30 text-white/80'
}

export const colorDotStyles: Record<EnumColor, string> = {
	DEFAULT: 'bg-muted-foreground/50 text-foreground',
	GRAY: 'bg-muted-foreground/50 text-foreground',
	BROWN: 'bg-amber-600/70 text-white/80',
	ORANGE: 'bg-amber-500/70 text-white/80',
	YELLOW: 'bg-amber-400/70 text-white/80',
	GREEN: 'bg-emerald-500/70 text-white/80',
	BLUE: 'bg-sky-400/50 text-white/80',
	PURPLE: 'bg-purple-400/50 text-white/80',
	PINK: 'bg-pink-400/50 text-white/80',
	RED: 'bg-red-400/50 text-white/80'
}
