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

interface SidebarContextType {
	sidebarRef: React.RefObject<HTMLElement>
	navbarRef: React.RefObject<HTMLDivElement>
	isResetting: boolean
	isCollapsed: boolean
	isMobile: boolean
	resetWidth: () => void
	collapse: () => void
	handleMouseDown: (event: React.MouseEvent) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
	const isMobile = useMediaQuery('(max-width: 768px)')
	const isResizingRef = useRef(false)
	const sidebarRef = useRef<HTMLElement | null>(null)
	const navbarRef = useRef<HTMLDivElement | null>(null)
	const [isResetting, setIsResetting] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(isMobile)

	const updateStyles = (width: number) => {
		if (!sidebarRef.current || !navbarRef.current) return

		sidebarRef.current.style.width = `${width}px`
		navbarRef.current.style.left = `${width}px`
		navbarRef.current.style.width = `calc(100% - ${width}px)`
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isResizingRef.current) return
		const newWidth = Math.min(Math.max(e.clientX, 250), 480)
		updateStyles(newWidth)
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

	const resetWidth = useCallback(() => {
		setIsCollapsed(false)
		setIsResetting(true)
		updateStyles(isMobile ? 0 : 250)
		setTimeout(() => setIsResetting(false), 300)
	}, [isMobile])

	const collapse = useCallback(() => {
		setIsCollapsed(true)
		setIsResetting(true)
		updateStyles(0)
		setTimeout(() => setIsResetting(false), 300)
	}, [])

	useEffect(() => {
		if (isMobile) {
			collapse()
		} else {
			resetWidth()
		}
	}, [isMobile, collapse, resetWidth])
	return (
		<SidebarContext.Provider
			value={{
				sidebarRef,
				navbarRef,
				isResetting,
				isCollapsed,
				isMobile,
				resetWidth,
				collapse,
				handleMouseDown
			}}
		>
			{children}
		</SidebarContext.Provider>
	)
}

export function useSidebar() {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider')
	}
	return context
}
