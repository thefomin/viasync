import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { columnApiCreateMutation, columnApiQuery } from '@/shared/api'
import { columnService } from '@/shared/services/document/column'
import { TypeCreateSchema } from '@/shared/schemes/document/column'

export function useCreateMutation() {
	const queryClient = useQueryClient()
	const { mutate: create, isPending } = useMutation({
		mutationKey: [columnApiCreateMutation.baseKey],
		mutationFn: (data: TypeCreateSchema) => columnService.create(data),
		async onSettled() {
			await queryClient.invalidateQueries({
				queryKey: [columnApiQuery.baseKey]
			})
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [columnApiQuery.baseKey]
			})
			toast.success('Колонка создана')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { create, isPending }
}
