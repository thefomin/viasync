import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { verificationService } from '@/shared/services/auth'
import { authApiVerification } from '@/shared/api'

export function useVerificationMutation() {
	const router = useRouter()

	const { mutate: verification } = useMutation({
		mutationKey: [authApiVerification.baseKey],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.success('Почта успешно подтверждена')
			router.push('/settings')
		},
		onError() {
			router.push('/auth/signin')
		}
	})

	return { verification }
}
