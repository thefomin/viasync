import { useProfile } from '@/shared/hooks/user'
import { Avatar, AvatarFallback, AvatarImage } from '..'
import { VscSettings } from 'react-icons/vsc'
import { IoNotificationsOutline } from 'react-icons/io5'
import { SetStateAction } from 'react'
import { cn } from '@/shared/utils'
import { FiSettings } from 'react-icons/fi'
import { GoBrowser } from 'react-icons/go'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'

type NavSettingsProps = {
	activeTab: 'preferences' | 'profile'
	setActiveTab: React.Dispatch<SetStateAction<'preferences' | 'profile'>>
}

interface NavButtonProps extends Partial<NavSettingsProps> {
	icon?: React.ElementType
	title: string
	tab?: 'preferences' | 'profile'
	avatar?: React.ReactNode
	disabled?: boolean
}
const NavButton = ({
	icon: Icon,
	avatar,
	title,
	tab,
	activeTab,
	setActiveTab,
	disabled = false
}: NavButtonProps) => {
	return (
		<div
			className={cn(
				'relative my-[1px] flex min-h-7 cursor-default items-center justify-between gap-2 rounded-sm px-3 hover:bg-primary/[.04]',
				disabled
					? 'cursor-not-allowed opacity-50'
					: activeTab === tab && 'cursor-pointer bg-primary/[.04]'
			)}
			onClick={() => !disabled && tab && setActiveTab?.(tab)}
		>
			<div
				role='button'
				className='group flex w-full items-center gap-2 rounded-md text-sm font-medium'
			>
				<span className='relative flex shrink-0 flex-row items-center gap-2 overflow-hidden'>
					{avatar ? avatar : Icon && <Icon className='h-5 w-5' />}
				</span>
				<div className='flex w-full flex-1 flex-row items-center gap-2 text-left text-sm leading-tight'>
					<span className='max-w-[50%] truncate font-semibold'>
						{title}
					</span>
				</div>
			</div>
		</div>
	)
}

export const NavSettings = ({ activeTab, setActiveTab }: NavSettingsProps) => {
	const { user } = useProfile()
	return (
		<div className='h-full w-60 rounded-l-xl bg-third'>
			<div className='flex h-full flex-col justify-between px-1'>
				<div className='overflow-auto pb-3 pt-2.5'>
					<div role='tablist' aria-orientation='vertical'>
						<div className='mb-[1px] h-6 items-center px-3 text-xs font-semibold text-muted-foreground/50'>
							Account
						</div>

						<NavButton
							avatar={
								<Avatar className='h-5 w-5 rounded-full'>
									{user?.picture ? (
										<AvatarImage
											src={user.picture}
											alt={user.displayName}
										/>
									) : (
										<AvatarFallback className='capitalist rounded-none bg-foreground uppercase text-background'>
											{user?.displayName.slice(0, 1)}
										</AvatarFallback>
									)}
								</Avatar>
							}
							title={user?.displayName || 'Profile'}
							tab='profile'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<NavButton
							icon={VscSettings}
							title='Preferences'
							tab='preferences'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<NavButton
							icon={IoNotificationsOutline}
							title='Notification'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							disabled={true}
						/>
						<div className='mb-[1px] mt-6 h-6 items-center px-3 text-xs font-semibold text-muted-foreground/50'>
							Workspace
						</div>
						<NavButton
							icon={FiSettings}
							title='General'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							disabled={true}
						/>
						<NavButton
							icon={HiOutlineBuildingOffice2}
							title='Teamspaces'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							disabled={true}
						/>
						<div className='flex h-4 w-full items-center justify-center'>
							<div
								role='separator'
								className='visible h-[1px] w-full border-b border-muted-foreground/10'
							></div>
						</div>
						<NavButton
							icon={GoBrowser}
							title='Sites'
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							disabled={true}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
