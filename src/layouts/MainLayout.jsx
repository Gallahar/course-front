import { Outlet } from 'react-router-dom'
import { UserHeader } from 'components/user/UserHeader'

export const MainLayout = () => {
	return (
		<div>
			<UserHeader />
			<section className='user_section'>
				<Outlet />
			</section>
		</div>
	)
}
