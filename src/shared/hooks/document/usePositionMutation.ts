import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { docColOrderApiUpdateMutation } from '@/shared/api'
import { columnService } from '@/shared/services/document/column'

export function usePositionMutation() {
	const { mutate: updatePosition } = useMutation({
		mutationKey: [docColOrderApiUpdateMutation.baseKey],

		mutationFn: async (variables: {
			ids: string[]
			documentId?: string | undefined
			columnId: string
		}) => {
			return columnService.docOrderUpdate(variables, variables.columnId)
		},

		onSettled() {
			toast.success('Порядок успешно обновлен')
		},
		onSuccess: (
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		) => {
			if (data.message) {
				toastMessageHandler(data)
			}
		},
		onError: error => {
			toastMessageHandler(error)
		}
	})
	return { updatePosition }
}
