'use client'

import { useTheme } from 'next-themes'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Input,
	Label,
	Switch
} from '..'
import { ChevronRight, Moon, Sun } from 'lucide-react'
import { useProfile, useUpdateProfileMutation } from '@/shared/hooks/user'
import { cn } from '@/shared/utils'
import { debounce } from 'lodash'
import { useQueryClient } from '@tanstack/react-query'
import { userApiQuery } from '@/shared/api'
import { IUser } from '@/shared/types/user'
import { ChangePassword } from './modals'

interface SettingsContent {
	children: React.ReactNode
	title: string
	description?: string
	className?: string
}

const Layout = ({ children, title }: SettingsContent) => {
	return (
		<div className='z-[1] overflow-auto px-[60px] py-9'>
			<div className='mb-4 mt-0 border-b border-muted-foreground/10 pb-3 text-base font-medium'>
				{title}
			</div>
			{children}
		</div>
	)
}

const SettingsValue = ({
	children,
	title,
	description,
	className
}: SettingsContent) => {
	return (
		<div className='flex items-center justify-between text-sm'>
			<div className='mr-1 flex w-2/3 flex-col gap-1.5'>
				<div className={cn('flex', className)}>{title}</div>
				<div className='flex text-xs font-medium text-muted-foreground/80'>
					{description}
				</div>
			</div>
			{children}
		</div>
	)
}

const debouncedUpdate = debounce(
	(
		updateProfile: (data: {
			name?: string
			isTwoFactorEnabled?: boolean
		}) => void,
		data: { name?: string; isTwoFactorEnabled?: boolean }
	) => {
		updateProfile(data)
	},
	500,
	{ leading: false, trailing: true }
)

const Profile = () => {
	const queryClient = useQueryClient() // ✅ Теперь это внутри компонента
	const { user } = useProfile()

	const { updateProfile } = useUpdateProfileMutation()

	const updateUserData = (newData: Partial<IUser>) => {
		const user = queryClient.getQueryData<IUser>([userApiQuery.baseKey])
		if (!user) {
			console.error('Пользователь не найден')
			return
		}
		const updatedUser = { ...user, ...newData }
		queryClient.setQueryData<IUser>([userApiQuery.baseKey], updatedUser)
	}

	const onChange = (value: string) => {
		updateUserData({ displayName: value })
		debouncedUpdate(updateProfile, { name: value })
	}

	const onChangeTwoFactor = (isEnabled: boolean) => {
		updateUserData({ isTwoFactorEnabled: isEnabled })
		debouncedUpdate(updateProfile, { isTwoFactorEnabled: isEnabled })
	}
	if (!user) return null

	return (
		<Layout title='Profile'>
			<div className='flex flex-row items-center'>
				<div className='flex cursor-pointer items-center'>
					<Avatar className='h-[60px] w-[60px] rounded-full'>
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
				</div>
				<div className='ml-5 w-[250px]'>
					<Label className='mb-1 block text-xs text-muted-foreground/80'>
						Preferred name
					</Label>
					<Input
						placeholder='username'
						value={user.displayName || ''}
						onChange={e => onChange(e.target.value)}
						className='h-[28px] w-full resize-none break-words rounded-sm border border-primary/10 bg-primary/5 px-2 py-0.5 text-foreground outline-none focus:ring-0'
					/>
				</div>
			</div>
			<div className='h-12 w-full'></div>
			<div className='mb-4 mt-0 border-b border-muted-foreground/10 pb-3 text-base font-medium'>
				Account security
			</div>
			<SettingsValue title='Email' description={`${user.email}`}>
				<Button
					variant='outline'
					className='h-[32px] disabled:cursor-not-allowed'
					disabled
				>
					Change Email
				</Button>
			</SettingsValue>
			<div className='h-[18px] w-full'></div>
			<SettingsValue
				title='Password'
				description='Set a permanent password to login to your account.'
			>
				<ChangePassword />
			</SettingsValue>

			<div className='h-[18px] w-full'></div>
			<SettingsValue
				title='2FA'
				description='Add an additional layer of security to your account
						during login.'
			>
				<Switch
					checked={user.isTwoFactorEnabled}
					onCheckedChange={onChangeTwoFactor}
				/>
			</SettingsValue>
			<div className='h-12 w-full'></div>
			<div className='mb-4 mt-0 border-b border-muted-foreground/10 pb-3 text-base font-medium'>
				Support
			</div>
			<SettingsValue
				title='Delete my account'
				description='Permanently delete the account and remove access from
						all workspaces.'
				className='text-[#eb5757]'
			>
				<Button
					variant='ghost'
					size='icon'
					className='h-[32px] cursor-not-allowed text-muted-foreground/50 hover:text-muted-foreground/50 disabled:cursor-not-allowed'
					disabled
				>
					<ChevronRight />
				</Button>
			</SettingsValue>
		</Layout>
	)
}

const Preferences = () => {
	const { setTheme, theme } = useTheme()
	return (
		<Layout title='Preferences'>
			<SettingsValue
				title='Appearance'
				description='Customize how viasync looks on your device.'
			>
				<Button
					variant='outline'
					size='icon'
					onClick={() =>
						setTheme(theme === 'light' ? 'dark' : 'light')
					}
				>
					{theme === 'light' && (
						<Sun className='h-[1.5rem] w-[1.3rem]' />
					)}
					{theme === 'dark' && (
						<Moon className='h-5 w-5 dark:block' />
					)}
				</Button>
			</SettingsValue>
		</Layout>
	)
}

export { Profile, Preferences }
