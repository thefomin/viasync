import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'
import { TypeCreateSchema } from '@/shared/schemes/document/tag'
import {
	documentApiQuery,
	tagApiCreateMutation,
	tagApiQuery
} from '@/shared/api'
import { tagService } from '@/shared/services/document/tag'
import { ITag } from '@/shared/types/document'

export function useCreateMutation(id: string) {
	const queryClient = useQueryClient()

	const { mutate: create, isPending } = useMutation({
		mutationKey: [tagApiCreateMutation.baseKey],
		mutationFn: (data: TypeCreateSchema) => tagService.create(data, id),
		async onSettled() {
			await queryClient.invalidateQueries({
				queryKey: [documentApiQuery.baseKey, id]
			})
		},
		onSuccess(variables) {
			queryClient.setQueryData(
				[tagApiQuery.baseKey],
				(oldData: ITag[]) => {
					if (!oldData) return [variables]
					return [...oldData, variables]
				}
			)

			toast.success('Тэг создан')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { create, isPending }
}
