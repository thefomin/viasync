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
	DEFAULT: 'bg-color-default text-foreground',
	GRAY: 'bg-color-gray text-foreground',
	BROWN: 'bg-color-brown text-foreground/80',
	ORANGE: 'bg-color-orange text-foreground/80',
	YELLOW: 'bg-color-yellow text-foreground/80',
	GREEN: 'bg-color-green text-foreground/80',
	BLUE: 'bg-color-blue text-foreground/80',
	PURPLE: 'bg-color-purple text-foreground/80',
	PINK: 'bg-color-pink text-foreground/80',
	RED: 'bg-color-red text-foreground/80'
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
