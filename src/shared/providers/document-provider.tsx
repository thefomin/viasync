'use client'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { useSidebar } from '.'
import { useRouter, useSearchParams } from 'next/navigation'

interface DocumentContextType {
	documentRef: React.RefObject<HTMLElement>
	navbarRef: React.RefObject<HTMLDivElement>
	isResetting: boolean
	isCollapsed: boolean
	isMobile: boolean
	resetWidth: () => void
	collapse: () => void
	handleMouseDown: (event: React.MouseEvent) => void
	resetWidthLeft: () => void
}

const DocumentContext = createContext<DocumentContextType | undefined>(
	undefined
)

export function DocumentProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const isMobile = useMediaQuery('(max-width: 768px)')
	const isResizingRef = useRef(false)
	const documentRef = useRef<HTMLElement | null>(null)
	const navbarRef = useRef<HTMLDivElement | null>(null)
	const [isResetting, setIsResetting] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(true)
	const sleep = (ms: number) =>
		new Promise(resolve => setTimeout(resolve, ms))
	const { collapse: collapseLeftSidebar, resetWidth: openLeftSidebar } =
		useSidebar()
	const updateStyles = (width: number) => {
		if (!documentRef.current) return

		documentRef.current.style.width = `${width}px`
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizingRef.current) return
		const maxWidth = window.innerWidth * 0.6
		const hiddenLeftSidebar = window.innerWidth * 0.5

		// Ограничиваем ширину от 250px до 50vw
		const newWidth = Math.min(
			Math.max(window.innerWidth - e.clientX, 560),
			maxWidth
		)
		updateStyles(newWidth)

		if (newWidth >= hiddenLeftSidebar) {
			collapseLeftSidebar()
		} else {
			openLeftSidebar()
		}
	}

	const handleMouseUp = () => {
		isResizingRef.current = false
		document.removeEventListener('mousemove', handleMouseMove)
		document.removeEventListener('mouseup', handleMouseUp)
	}

	const handleMouseDown = (event: React.MouseEvent) => {
		event.preventDefault()
		isResizingRef.current = true
		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	const resetWidth = () => {
		setIsCollapsed(false)
		setIsResetting(true)
		updateStyles(560)
		setTimeout(() => setIsResetting(false), 300)
	}

	const resetWidthLeft = () => {
		setIsCollapsed(true) // Закрываем правый сайдбар
		setIsResetting(true)
		updateStyles(0)
		openLeftSidebar()
		setTimeout(() => {
			setIsResetting(false)
		}, 300) // Даем время на анимацию
	}

	const collapse = useCallback(async () => {
		setIsCollapsed(true)
		setIsResetting(true)
		await sleep(300)
		updateStyles(0)
		setIsResetting(false)

		await sleep(200)
		const params = new URLSearchParams(searchParams.toString())
		params.delete('v')
		router.replace(`?${params.toString()}`, { scroll: false })
	}, [searchParams, router])

	useEffect(() => {
		collapse()
	}, [collapse])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				documentRef.current &&
				!documentRef.current.contains(event.target as Node)
			) {
				setIsCollapsed(true)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<DocumentContext.Provider
			value={{
				documentRef,
				navbarRef,
				isResetting,
				isCollapsed,
				isMobile,
				resetWidth,
				collapse,
				handleMouseDown,
				resetWidthLeft
			}}
		>
			{children}
		</DocumentContext.Provider>
	)
}

export function useDocument() {
	const context = useContext(DocumentContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider')
	}
	return context
}
