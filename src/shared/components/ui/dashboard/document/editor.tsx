'use client'

import { BlockNoteEditor, PartialBlock, locales } from '@blocknote/core'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { useTheme } from 'next-themes'

import '@/shared/styles/editor.css'
import { useCallback } from 'react'
import { debounce } from 'lodash'
import { IDocument } from '@/shared/types/document'
import { useUpdateMutation } from '@/shared/hooks/document'
import { useQueryClient } from '@tanstack/react-query'
import { QueryClientService } from '@/shared/services/document'

interface EditorProps {
	initialData: IDocument
	editable?: boolean
}

export const Editor = ({ initialData, editable }: EditorProps) => {
	const queryClient = useQueryClient()
	const queryClientService = new QueryClientService(queryClient)
	const { update } = useUpdateMutation()
	const { theme } = useTheme()
	const locale = locales['ru']

	// Создаем редактор с начальным контентом
	const editor: BlockNoteEditor = useCreateBlockNote({
		tables: {
			splitCells: true,
			cellBackgroundColor: true,
			cellTextColor: true,
			headers: true
		},
		initialContent: initialData.content
			? (JSON.parse(initialData.content) as PartialBlock[])
			: undefined,
		dictionary: {
			...locale
		}
	})

	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	const debouncedDocument = useCallback(
		debounce((content: string) => {
			update({
				id: initialData.id,
				data: {
					content
				}
			})
		}, 500),
		[update, initialData.id]
	)

	const onChange = (content: string) => {
		if (!editable) return
		// Обновляем все поля с новым контентом
		queryClientService.updateAllFields(initialData, {
			content,
			updatedAt: new Date().toISOString()
		})
		// Делаем отложенное обновление в базе данных
		debouncedDocument(content)
	}

	const uploadToDatabase = () => {
		if (onChange) {
			onChange(JSON.stringify(editor.document, null, 2))
		}
	}

	return (
		<div className='group relative -ml-14 mt-10 pl-12'>
			<BlockNoteView
				onChange={uploadToDatabase}
				editor={editor}
				editable={editable}
				theme={theme === 'light' ? 'light' : 'dark'}
				data-theming-css-variables-demo
				key={initialData.id}
			/>
		</div>
	)
}
