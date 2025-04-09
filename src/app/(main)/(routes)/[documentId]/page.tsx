'use client'

import dynamic from 'next/dynamic'
const DocumentId = dynamic(
	() => import('@/features/document/components/document-id'),
	{
		ssr: false
	}
)

export default function DocumentIdPage({
	params
}: {
	params: { documentId: string }
}) {
	const documentId = params.documentId
	return (
		<div className='flex h-full flex-col items-center justify-start space-y-4'>
			<DocumentId documentId={documentId} />
		</div>
	)
}
