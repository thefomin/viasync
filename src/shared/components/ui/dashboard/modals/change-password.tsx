import { CgPassword } from 'react-icons/cg'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../..'

export const ChangePassword = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='h-[32px] cursor-not-allowed disabled:cursor-not-allowed'
					disabled
				>
					Change Password
				</Button>
			</DialogTrigger>
			<DialogContent className='z-[9999999] h-[350px] w-[350px] rounded-xl border border-muted-foreground/20 bg-third p-0'>
				<div className='p-6'>
					<div className='mb-3.5 flex justify-center'>
						<CgPassword className='h-6 w-6' />
					</div>
					<div className='flex flex-col justify-center text-center'>
						<div className='text-sm font-semibold'>
							Set a password
						</div>
						<div className='text-xs'>
							Use a password at least 15 letters long, or at least
							8 characters long with both letters and numbers.
						</div>
					</div>
				</div>
				<DialogHeader className='sr-only'>
					<DialogTitle className='text-sm font-semibold'>
						Set a password
					</DialogTitle>
					<DialogDescription className='max-w-64 text-xs'>
						Use a password at least 15 letters long, or at least 8
						characters long with both letters and numbers.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className='sr-only'></DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
