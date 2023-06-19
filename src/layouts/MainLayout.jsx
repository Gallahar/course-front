import { Outlet } from 'react-router-dom'
import { UserHeader } from 'components/user/UserHeader'

export const MainLayout = () => {
	// Лейаут для использования на всех роутах(страницах) основной части приложения.
	return (
		<div>
			<UserHeader />
			<section className="user_section">
				<Outlet />
			</section>
		</div>
	)
}
