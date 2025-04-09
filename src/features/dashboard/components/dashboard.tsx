'use client'

import { DashboardWrapper, LastVisited, Title } from '.'

export function Dashboard() {
	return (
		<DashboardWrapper>
			<div className='relative flex flex-1 flex-col gap-6 overflow-hidden'>
				<Title />

				<LastVisited />
			</div>
		</DashboardWrapper>
	)
}
