import dynamic from 'next/dynamic'
const PreviewId = dynamic(
	() => import('@/features/preview/components/preview-id'),
	{
		ssr: false
	}
)
export default function PreviewIdPage({ params }: { params: { id: string } }) {
	const previewId = params.id
	return <PreviewId documentId={previewId} />
}
