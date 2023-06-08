import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
	return (
		<section className="admin-section">
			<header> МЕСТО ДЛЯ ХЕДЕРА</header>
			<Outlet />
		</section>
	)
}
