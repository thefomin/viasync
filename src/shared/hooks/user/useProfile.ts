import { useQuery } from '@tanstack/react-query'

import { userService } from '@/shared/services/user'
import { userApiQuery } from '@/shared/api'

export function useProfile() {
	const { data: user, isLoading } = useQuery({
		queryKey: [userApiQuery.baseKey],
		queryFn: () => userService.findProfile()
	})
	return {
		user,
		isLoading
	}
}
