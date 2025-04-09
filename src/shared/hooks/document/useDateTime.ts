import { IDocument } from '@/shared/types/document'
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes
} from 'date-fns'

export function useDateTime(initialData: IDocument) {
	const createdAtDate = new Date(initialData.createdAt)
	const updatedAtDate = new Date(initialData.updatedAt)
	const now = new Date()

	const formatTime = (date: Date) => {
		const minutes = differenceInMinutes(now, date)
		const hours = differenceInHours(now, date)
		const days = differenceInDays(now, date)

		if (minutes < 1) return 'just now'
		if (minutes < 60) return `${minutes}m ago`
		if (hours < 24) return `${hours}h ago`
		return `${days}d ago`
	}
	return {
		createdAt: formatTime(createdAtDate),
		updatedAt: formatTime(updatedAtDate)
	}
}
