import { Outlet } from 'react-router-dom'
import { UserHeader } from 'components/user/UserHeader'

export const MainLayout = () => {
	return (
		<section className="admin-section">
			<UserHeader />
			<Outlet />
		</section>
	)
}
